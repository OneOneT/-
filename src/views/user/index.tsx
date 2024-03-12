import React, { memo, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { shallowEqual } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchUserInfo } from '@/store/moudles/user'
import {
  fetchUserArticleList,
  initUserArticleList
} from '@/store/moudles/article'
import { Avatar, Button, Tabs, TabsProps } from 'antd'
import { BellFilled, StarOutlined } from '@ant-design/icons'

import { ContentList, UserContent, UserTop, UserWrapper } from './style'
import ContentV1 from '@/components/content-v1'

interface IUserProps {
  children?: ReactNode
}

const User: React.FunctionComponent<IUserProps> = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { userId, userInfo, useArticleList } = useAppSelector(
    (state) => ({
      userInfo: state.user.userInfo,
      useArticleList: state.article.userArticleList,
      userId: state.user.id
    }),
    shallowEqual
  )

  const { id } = useParams()

  const [pageSize, setPageSize] = useState(4)
  const [currentPage, setCurrentPage] = useState(1)
  const [isAuthor, setIsAuthor] = useState(false)

  useEffect(() => {
    dispatch(fetchUserInfo(Number(id)))
    getUserAryicleList()

    return () => {
      dispatch(initUserArticleList())
    }
  }, [id, dispatch])

  useEffect(() => {
    isAuthorFn()
  }, [userInfo])

  const isAuthorFn = () => {
    if (userInfo) {
      setIsAuthor(Number(userId) === Number(userInfo?.id))
    }
  }

  const getUserAryicleList = async () => {
    const offset = (currentPage - 1) * pageSize
    const size = pageSize

    const queryInfo = { size, offset }

    await dispatch(fetchUserArticleList({ id: Number(id), queryInfo }))
    setCurrentPage((preValue) => {
      return preValue + 1
    })
  }

  const handleMore = () => {
    getUserAryicleList()
  }

  const tabsItems: TabsProps['items'] = [
    {
      key: '1',
      label: '动态',
      icon: <BellFilled />,
      children: (
        <ContentList>
          {useArticleList.map((item: any) => {
            return (
              <div
                style={{ marginBottom: '20px' }}
                key={item.id}
                className="item"
              >
                <ContentV1
                  isShowOptions={false}
                  tags={{ tagsData: item.tags ?? [] }}
                  author={{
                    authorData: item.authorInfo
                  }}
                  article={{
                    articleData: item,
                    articleContentEl: (
                      <Link
                        className="global_text_v2  text-ellipis2"
                        to={`/article/${item.id}`}
                        target="_blank"
                      >
                        {item.article_summary}
                      </Link>
                    )
                  }}
                />
              </div>
            )
          })}

          <div className="btn-v2" onClick={() => handleMore()}>
            更多
          </div>
        </ContentList>
      )
    },
    {
      key: '2',
      label: '收藏',
      icon: <StarOutlined />,
      children: 'Content of Tab Pane 2'
    }
  ]

  return (
    <UserWrapper className="wrapper-v1">
      <UserTop>
        <div className="background">
          <img className="image" src="/src/assets/images/bag.jpeg" alt="" />
        </div>

        <div className="userInfo">
          <div className="avatar">
            <Avatar
              size={100}
              src={
                <img
                  src={
                    userInfo.avatarUrl
                      ? userInfo.avatarUrl
                      : '/src/assets/images/avatar_default.png'
                  }
                  alt="avatar"
                />
              }
            />
          </div>

          <div className="name">
            <span>{userInfo.nickname}</span>
          </div>

          <div className="fun">
            <a href="/">
              关注
              <span>0</span>
            </a>
            <a href="/">
              粉丝
              <span>0</span>
            </a>
          </div>

          <div className="desc">
            <span>暂无描述</span>
          </div>

          {isAuthor ? (
            <Button
              className="btn edit"
              type="primary"
              size="small"
              shape="round"
              onClick={() => navigate('/setting/userInfo')}
            >
              编辑
            </Button>
          ) : (
            <Button className="btn" type="primary" shape="round" size="small">
              关注
            </Button>
          )}
        </div>
      </UserTop>

      <UserContent className="wrapper-v2">
        <Tabs size="large" tabPosition="right" items={tabsItems} />
      </UserContent>
    </UserWrapper>
  )
}

export default memo(User)
