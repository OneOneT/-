import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  fetchLoadAvatar,
  fetchUpdateUserInfo,
  fetchUserInfo
} from '@/store/moudles/user'

import { Avatar, Button, Form, Input, Upload, UploadProps, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { UserInfoWrapper } from './style'

interface IUserInfoProps {
  children?: ReactNode
}

const UserInfo: React.FunctionComponent<IUserInfoProps> = () => {
  const dispatch = useAppDispatch()
  const { id, userInfo } = useAppSelector(
    (state) => ({
      id: state.user.id,
      userInfo: state.user.loginUser
    }),
    shallowEqual
  )

  const initialValues = {
    nickname: userInfo.nickname,
    email: userInfo.email
  }

  const props: UploadProps = {
    name: 'avatar',
    maxCount: 1,
    beforeUpload: (file) => {
      //文件类型校验
      const types = ['image/png', 'image/jpeg', 'image/jpg']

      const isImage = types.some((type) => {
        return type === file.type
      })

      if (!isImage) message.error(`上传失败：上传文件格式有误`)

      return false
    }
  }

  const normFile = (e: any) => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  const onFinish = async (values: any) => {
    const { avatar } = values
    const newValue = {
      nickname: values.nickname,
      email: values.email
    }

    await dispatch(fetchUpdateUserInfo(newValue))
    // 头像上传
    if (avatar) {
      const file = avatar[0].originFileObj
      await dispatch(fetchLoadAvatar(file))
    }

    await dispatch(fetchUserInfo(id!))
  }

  return (
    <UserInfoWrapper>
      <div className="form">
        <Form
          layout={'vertical'}
          initialValues={initialValues}
          onFinish={onFinish}
        >
          <Form.Item name="nickname" label="姓名">
            <Input />
          </Form.Item>
          <Form.Item
            name="avatar"
            label="头像 "
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>选择文件</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              更新
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className="avatar">
        <Avatar
          size={84}
          src={
            userInfo.avatarUrl
              ? userInfo.avatarUrl
              : '/src/assets/images/avatar_default.png'
          }
        />
      </div>
    </UserInfoWrapper>
  )
}

export default memo(UserInfo)
