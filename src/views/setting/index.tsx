import React, { memo, useState } from 'react'
import type { ReactNode } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Menu, MenuProps } from 'antd'
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons'
import { SettingWrapper } from './style'

interface ISettingProps {
  children?: ReactNode
}

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

const items: MenuProps['items'] = [
  getItem('个人信息', 'userInfo', <MailOutlined />),
  getItem('密码', 'password', <AppstoreOutlined />)
]

const Setting: React.FunctionComponent<ISettingProps> = () => {
  const navigate = useNavigate()

  const [current, setCurrent] = useState('userInfo')

  const handleMenu: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
    setCurrent(e.key)
    navigate(`/setting/${e.key}`)
  }

  return (
    <SettingWrapper>
      <div className="content wrapper-v1">
        <div className="left">
          <Menu
            onClick={handleMenu}
            style={{ width: 230 }}
            selectedKeys={[current]}
            mode="inline"
            items={items}
          />
        </div>

        <div className="right">
          <Outlet />
        </div>
      </div>
    </SettingWrapper>
  )
}

export default memo(Setting)
