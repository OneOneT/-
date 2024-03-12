import React, { memo, useEffect } from 'react'
import type { ReactNode } from 'react'
import { shallowEqual } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store'
import { loadLocalUserInfo } from '@/store/moudles/user'
import { fetchCategoryList } from '@/store/moudles/category'
import { Avatar, Button, Dropdown, Input, MenuProps, Popover } from 'antd'
import Panel from './cpns/panel'
import {
  PlusOutlined,
  PoweroffOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons'
import {
  HeaderBtm,
  HeaderContent,
  HeaderLeft,
  HeaderRight,
  MainHeaderWarpper
} from './style'
import { localCache } from '@/utiles/cache'

interface IMainHeaderProps {
  children?: ReactNode
}

const MainHeader: React.FunctionComponent<IMainHeaderProps> = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { id, name, token, userInfo, categoryList } = useAppSelector(
    (state) => ({
      id: state.user.id,
      name: state.user.name,
      token: state.user.token,
      userInfo: state.user.loginUser,
      categoryList: state.category.categorylist
    }),
    shallowEqual
  )

  useEffect(() => {
    dispatch(fetchCategoryList())
  }, [])

  const quitLogin = () => {
    localCache.removeCache('token')

    dispatch(loadLocalUserInfo())
  }

  const { Search } = Input
  const items: MenuProps['items'] = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: <span onClick={() => navigate(`/user/${id}`)}>个人主页</span>
    },
    {
      key: '2',
      icon: <SettingOutlined />,
      label: <span onClick={() => navigate('/setting')}>账号设置</span>
    },
    {
      key: '3',
      icon: <PoweroffOutlined />,
      label: <span onClick={() => quitLogin()}>退出登陆</span>
    }
  ]

  return (
    <MainHeaderWarpper>
      <HeaderContent className="wrapper-v1">
        <HeaderLeft>
          <NavLink to={'/home'} className="logo">
            论坛
          </NavLink>

          <Popover
            placement={'bottom'}
            content={<Panel contentList={categoryList} />}
          >
            <Button ghost className="classify">
              分类
            </Button>
          </Popover>

          <Search
            className="search"
            placeholder="搜索感兴趣的内容"
            // onSearch={onSearch}
            enterButton
          />
        </HeaderLeft>
        <HeaderRight>
          {token ? (
            <>
              <Link to={'/new'} target="_blank">
                <Button
                  type="primary"
                  shape="round"
                  icon={<PlusOutlined />}
                  size={'middle'}
                >
                  发布
                </Button>
              </Link>

              <div className="notification">消息</div>

              <Dropdown menu={{ items }} placement="bottom" arrow>
                <div
                  className="account"
                  onClick={() => navigate(`/user/${id}`)}
                >
                  <Avatar
                    size={40}
                    src={
                      userInfo.avatarUrl
                        ? userInfo.avatarUrl
                        : '/src/assets/images/avatar_default.png'
                    }
                  />
                  <div className="name">{name}</div>
                </div>
              </Dropdown>
            </>
          ) : (
            <NavLink to={'/login'} className="login">
              注册/登陆
            </NavLink>
          )}
        </HeaderRight>
      </HeaderContent>

      <HeaderBtm />
    </MainHeaderWarpper>
  )
}

export default memo(MainHeader)
