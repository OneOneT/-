import React, { memo, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { shallowEqual } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Modal, Popover, Tag } from 'antd'
import { MdPreview } from 'md-editor-rt'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchArticleDetail, fetchDeleteArticle } from '@/store/moudles/article'
import { fetchArticleComment } from '@/store/moudles/comment'
import {
  ArticleLeft,
  ArticleRight,
  ArticleWrapper,
  ContentWrapper,
  MoreContentWrapper,
  TagWrapper
} from './style'
import 'md-editor-rt/lib/preview.css'
import ContentV1 from '@/components/content-v1'
import Comment from './cpns/comment'
import { formatDate } from '@/utiles/format'

interface IArticleProps {
  children?: ReactNode
}

const Article: React.FunctionComponent<IArticleProps> = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { comCurrentPage, articleInfo, userId } = useAppSelector(
    (state) => ({
      comCurrentPage: state.comment.currenPage,
      userId: state.user.id,
      articleInfo: state.article.articleInfo
    }),
    shallowEqual
  )

  const { id } = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAuthore, setIsAuthor] = useState(false)

  useEffect(() => {
    dispatch(fetchArticleDetail(Number(id)))
  }, [])

  useEffect(() => {
    dispatch(fetchArticleComment(Number(id)))
  }, [comCurrentPage])

  useEffect(() => {
    // 验证是否有权限
    if (articleInfo) {
      setIsAuthor(Number(userId) === Number(articleInfo.authorInfo?.id))
    }
  }, [articleInfo])

  // 删除操作
  const handleOk = async () => {
    console.log(id)

    dispatch(fetchDeleteArticle(Number(id))).then(() => {
      setIsModalOpen(false)
      navigate('/home')
    })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <ArticleWrapper className="wrapper-v1">
      <Modal
        title="删除文章"
        style={{ top: 20 }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>确认要删除吗!!!</p>
      </Modal>

      <ArticleLeft>
        <ContentV1
          isShowOptions
          author={{
            authorData: articleInfo?.authorInfo,
            authorMidEl: (
              <div className="createAt">
                {formatDate(articleInfo?.article?.createAt)}
              </div>
            ),
            authorRightEl: isAuthore ? (
              ''
            ) : (
              <Button type="primary" shape="round">
                关注
              </Button>
            )
          }}
          article={{
            articleData: articleInfo,
            articleContentEl: (
              <>
                {articleInfo?.tags ? (
                  <TagWrapper>
                    <span className="tag-title">标签:</span>
                    {articleInfo?.tags?.map((item: any) => {
                      return (
                        <Tag key={item.id} color="warning" bordered={false}>
                          {item.name}
                        </Tag>
                      )
                    })}
                  </TagWrapper>
                ) : (
                  ''
                )}

                {articleInfo?.articleDetail?.content_md ? (
                  <MdPreview
                    editorId={'preview-only'}
                    modelValue={articleInfo?.articleDetail?.content_md}
                  />
                ) : (
                  <ContentWrapper
                    dangerouslySetInnerHTML={{
                      __html: articleInfo?.articleDetail?.content_html
                    }}
                  ></ContentWrapper>
                )}
              </>
            )
          }}
          option={{
            optionEl: isAuthore ? (
              <Popover
                content={
                  <>
                    <MoreContentWrapper>
                      <p onClick={() => navigate(`/article/${id}/edit`)}>
                        修改文章
                      </p>
                      <p onClick={() => setIsModalOpen(true)}>删除文章</p>
                    </MoreContentWrapper>
                  </>
                }
                placement="bottom"
              >
                <i className="icon iconfont icon-gengduo" />
              </Popover>
            ) : null
          }}
        />

        <Comment />
      </ArticleLeft>

      <ArticleRight>
        <div className="recommend">
          <div className="title">相关推荐</div>
          <div className="content">123</div>
        </div>
      </ArticleRight>
    </ArticleWrapper>
  )
}

export default memo(Article)
