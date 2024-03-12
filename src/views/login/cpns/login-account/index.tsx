import React, { memo } from 'react'
import type { ReactNode } from 'react'

import { LoginAccountWrapper } from './style'
import { Button, Checkbox, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

import { useAppDispatch } from '@/store'
import { fetchLogin } from '@/store/moudles/user'
import { localCache } from '@/utiles/cache'
import { useNavigate } from 'react-router-dom'

interface ILoginAccountProps {
  children?: ReactNode
}

const LoginAccount: React.FunctionComponent<ILoginAccountProps> = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // 初始化数据
  const initialValues = {
    name: localCache.getCache('name') ?? '',
    password: localCache.getCache('password') ?? '',
    remember: true
  }

  const onFinish = async (values: any) => {
    await dispatch(fetchLogin(values))

    if (localCache.getCache('token')) {
      //  验证成功 记住密码
      if (values.remember) {
        localCache.setCache('name', values.name)
        localCache.setCache('password', values.password)
      } else {
        localCache.removeCache('name')
        localCache.removeCache('password')
      }

      // 路由跳转
      navigate('home')
    }
  }

  return (
    <>
      <LoginAccountWrapper>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={initialValues}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: '用户名不能为空!!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '密码不能为空!!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>

          {/* 其他操作 */}
          <Form.Item>
            <div className="options">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>

              <a className="forgot" href="/">
                登陆遇到问题?
              </a>
            </div>
          </Form.Item>

          {/* 登陆按钮 */}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button">
              登陆
            </Button>
          </Form.Item>
        </Form>
      </LoginAccountWrapper>
    </>
  )
}

export default memo(LoginAccount)
