import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { PasswordWrapper } from './style'
import { Button, Form, Input } from 'antd'

interface IPasswordProps {
  children?: ReactNode
}

const Password: React.FunctionComponent<IPasswordProps> = () => {
  const onFinish = (values: any) => {
    console.log(values)
  }

  return (
    <PasswordWrapper>
      <div className="form">
        <Form layout={'vertical'} onFinish={onFinish}>
          <Form.Item name="nickname" label="旧密码">
            <Input />
          </Form.Item>

          <Form.Item name="email" label="密码">
            <Input />
          </Form.Item>

          <Form.Item name="email" label="确认密码">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              修改密码
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PasswordWrapper>
  )
}

export default memo(Password)
