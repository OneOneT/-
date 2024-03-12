import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { RegisterWrapper } from './style'
import { Button, Form, Input, message } from 'antd'
import { useAppDispatch } from '@/store'
import { fetchRegister } from '@/store/moudles/user'

interface IRegisterProps {
  children?: ReactNode
}

const Register: React.FunctionComponent<IRegisterProps> = () => {
  const dispatch = useAppDispatch()

  const onFinish = (values: any) => {
    // 判断两次密码是否一致
    if (values.password !== values.confirmPassword)
      return message.error('密码不一致')

    const newObj: any = {}
    for (const key in values) {
      if (key === 'confirmPassword') continue
      newObj[key] = values[key]
    }
    console.log(newObj)
    dispatch(fetchRegister(newObj))
  }

  return (
    <RegisterWrapper>
      <div className="form">
        <Form layout={'vertical'} onFinish={onFinish}>
          <Form.Item
            name="name"
            label="用户名"
            rules={[{ required: true, message: '用户名不能为空!!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="nickname"
            label="姓名"
            rules={[{ required: true, message: '姓名不能为空!!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="Email" label="Email">
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '密码不能为空!!' }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="确认密码"
            rules={[{ required: true, message: '密码不能为空!!' }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交注册信息
            </Button>
          </Form.Item>
        </Form>
      </div>
    </RegisterWrapper>
  )
}

export default memo(Register)
