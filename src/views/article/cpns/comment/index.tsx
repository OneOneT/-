import React, { memo, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

import { CommentWrapper } from './style'
import { useAppDispatch, useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import CommentV1 from '../commentV1'
import Reply_input from '../reply_input'
import { useParams } from 'react-router-dom'
import {
  changeCurrentPageAction,
  fetchCreateArtComment
} from '@/store/moudles/comment'
import { Pagination } from 'antd'

interface ICommentProps {
  children?: ReactNode
}

const Comment: React.FunctionComponent<ICommentProps> = () => {
  const dispatch = useAppDispatch()
  const { comPageSize, comCurrentPage, articleComment, loginUserInfo } =
    useAppSelector(
      (state) => ({
        comPageSize: state.comment.pageSize,
        comCurrentPage: state.comment.currenPage,
        loginUserInfo: state.user.loginUser,
        articleComment: state.comment.articleComment
      }),
      shallowEqual
    )

  const { id } = useParams()
  const [comTetx, setComText] = useState('')

  const onChangePage = (page: number) => {
    dispatch(changeCurrentPageAction(page))
  }

  useEffect(() => {
    console.log(articleComment)
  }, [articleComment])

  const handleComBtn = () => {
    // console.log('发表', comTetx)
    // 顶层评论
    const content = comTetx
    const user_id = loginUserInfo.id
    const article_id = Number(id)
    const queryInfo = { content, user_id, article_id, type: 1 }
    dispatch(fetchCreateArtComment(queryInfo))
    dispatch(changeCurrentPageAction(1))

    //  清空文本框
    setComText('')
  }

  return (
    <CommentWrapper>
      <div className="title">
        <span>所有评论</span>
        <span>{articleComment.totail ? articleComment.totail : ''}</span>
      </div>

      <div className="com">
        <div className="author avatar-v1">
          <img
            className=""
            src={
              loginUserInfo?.avatarUrl
                ? loginUserInfo?.avatarUrl
                : '/src/assets/images/avatar_default.png'
            }
            alt=""
          />
        </div>

        <div className="reply-input">
          <Reply_input
            TextAreaText={comTetx}
            TextAreaChange={(e) => setComText(e.target.value)}
            comBtnClick={() => handleComBtn()}
          />
        </div>
      </div>

      {articleComment?.list?.length ? (
        <div className="list">
          {articleComment?.list?.map((item1: any) => {
            return (
              <div
                className="item"
                style={{ marginBottom: '20px' }}
                key={item1.id}
              >
                <CommentV1
                  commentData={item1}
                  commentChildren={item1?.children?.map((item2: any) => {
                    return (
                      <div key={item2.id} style={{ margin: '20px 0' }}>
                        <CommentV1 commentData={item2} />
                      </div>
                    )
                  })}
                />
              </div>
            )
          })}

          {articleComment.totail > comPageSize ? (
            <div className="pagination">
              <Pagination
                defaultPageSize={comPageSize}
                total={articleComment.totail}
                current={comCurrentPage}
                onChange={onChangePage}
              />
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        <div className="default">
          <img src="/src/assets/images/com_def.png" alt="" />
          <span>你也来说些什么吧</span>
        </div>
      )}
    </CommentWrapper>
  )
}

export default memo(Comment)
