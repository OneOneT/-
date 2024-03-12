import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { LoginWrapper } from './style'
import { Tabs, TabsProps } from 'antd'
import LoginAccount from './cpns/login-account'
import Register from './cpns/register'

interface ILoginProps {
  children?: ReactNode
}

const Login: React.FunctionComponent<ILoginProps> = () => {
  const tabsItems: TabsProps['items'] = [
    {
      key: '1',
      label: '登陆',
      children: <LoginAccount />
    },
    {
      key: '2',
      label: '注册',
      children: <Register />
    }
  ]

  return (
    <LoginWrapper>
      <div className="panel">
        <Tabs size="large" defaultActiveKey="1" centered items={tabsItems} />
      </div>
    </LoginWrapper>
  )
}

export default memo(Login)
