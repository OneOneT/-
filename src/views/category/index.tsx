import React, { memo, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { shallowEqual } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store'
import {
  fetchCategoryArticleList,
  fetchCategoryInfo
} from '@/store/moudles/category'
import { Pagination } from 'antd'
import ContentV1 from '@/components/content-v1'
import { CategoryWrapper } from './style'
import { formatDate } from '@/utiles/format'

interface ICategoryProps {
  children?: ReactNode
}

const Category: React.FunctionComponent<ICategoryProps> = () => {
  const dispatch = useAppDispatch()
  const { currentCategory, categoryArticleTotail, categoryArticleList } =
    useAppSelector(
      (state) => ({
        currentCategory: state.category.currentCategory,
        categoryArticleTotail: state.category.categoryArticleListTotail,
        categoryArticleList: state.category.categoryArticleList
      }),
      shallowEqual
    )

  const { id } = useParams()

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(3)

  useEffect(() => {
    getCategoryInfo()
    getCategoryArticleList()

    return () => {
      // 初始化
      setCurrentPage(1)
    }
  }, [id])

  useEffect(() => {
    getCategoryArticleList()
  }, [currentPage])

  const getCategoryInfo = () => {
    dispatch(fetchCategoryInfo(Number(id)))
  }

  const getCategoryArticleList = () => {
    const size = pageSize
    const offset: number = (currentPage - 1) * pageSize

    const queryInfo = { size, offset }
    dispatch(fetchCategoryArticleList({ id: Number(id), queryInfo }))
  }

  const handlePagination = async (page: number) => {
    setCurrentPage(page)
  }

  return (
    <CategoryWrapper>
      <div className="wrapper-v2">
        <div className="head">
          <div className="title">{currentCategory?.name}</div>
          <div className="totail">
            <span>{categoryArticleTotail}</span>
            <span>文章</span>
          </div>
        </div>

        <div className="options">
          <span className="active">热门</span>
          <span>最新</span>
        </div>

        <div className="content">
          <div className="list">
            {categoryArticleList.length ? (
              categoryArticleList.map((item: any) => {
                return (
                  <div className="item" key={item.id}>
                    <ContentV1
                      tags={{ tagsData: item.tags ?? [] }}
                      isShowOptions={false}
                      author={{
                        authorData: item.authorInfo,
                        authorMidEl: (
                          <div style={{ fontSize: '12px' }}>
                            {formatDate(item.createAt)}
                          </div>
                        )
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
              })
            ) : (
              <div className="not-article">暂无收入文章</div>
            )}
          </div>
        </div>

        <div className="pagination">
          {categoryArticleList.length ? (
            <Pagination
              defaultCurrent={1}
              defaultPageSize={pageSize}
              total={categoryArticleTotail}
              current={currentPage}
              onChange={handlePagination}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </CategoryWrapper>
  )
}

export default memo(Category)
