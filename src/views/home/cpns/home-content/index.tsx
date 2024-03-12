import React, { memo, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { shallowEqual } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  fetchArticleList,
  initArticleListAction
} from '@/store/moudles/article'
import { Tabs } from 'antd'
import ContentV1 from '@/components/content-v1'
import Recommend from './cpns/recommend'
import { HomeContentWrapper, LeftContent, RightContent } from './style'

interface IHomeContentProps {
  children?: ReactNode
}

const HomeContent: React.FunctionComponent<IHomeContentProps> = () => {
  const dispatch = useAppDispatch()
  const { articleList } = useAppSelector(
    (state) => ({
      articlePage: state.article.articlePage,
      articleList: state.article.articleList
    }),
    shallowEqual
  )

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(3)

  useEffect(() => {
    getArticleList()

    return () => {
      dispatch(initArticleListAction())
    }
  }, [])

  const tags = ['每日精选', '特别关注']

  // !!bug 页面切换问题
  const getArticleList = () => {
    const size = pageSize
    const offset = (currentPage - 1) * size
    const pageInfo = { size, offset }

    const queryInfo = { ...pageInfo }
    dispatch(fetchArticleList(queryInfo))
    setCurrentPage((preValue) => {
      return preValue + 1
    })
  }

  const handleMore = () => {
    getArticleList()
  }

  return (
    <HomeContentWrapper>
      <LeftContent>
        <div className="content-tag">
          <Tabs
            tabPosition="left"
            items={tags.map((item, index) => {
              const id = String(index + 1)
              return {
                label: item,
                key: id,
                children: (
                  <div className="content_list">
                    {articleList?.map((item: any) => {
                      return (
                        <div className="content_item" key={item.id}>
                          <ContentV1
                            tags={{ tagsData: item.tags ?? [] }}
                            author={{ authorData: item.authorInfo }}
                            article={{
                              articleData: item,
                              articleContentEl: (
                                <NavLink
                                  to={`/article/${item.id}`}
                                  target="_blank"
                                  className="global_text_v2  text-ellipis2"
                                >
                                  {item.article_summary}
                                </NavLink>
                              )
                            }}
                          />
                        </div>
                      )
                    })}

                    <div className="btn-v2" onClick={() => handleMore()}>
                      查看更多
                    </div>
                  </div>
                )
              }
            })}
          />
        </div>
      </LeftContent>

      <RightContent>
        <Recommend />
      </RightContent>
    </HomeContentWrapper>
  )
}

export default memo(HomeContent)
