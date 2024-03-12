import React, { memo, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { shallowEqual } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store'
import { Popover } from 'antd'
import {
  DeleteOutlined,
  EllipsisOutlined,
  MessageOutlined
} from '@ant-design/icons'
import Reply_input from '../reply_input'
import { CommentV1Wrapper, PopoverWrapper } from './style'
import { formatDate } from '@/utiles/format'

import {
  fetchCreateArtComment,
  fetchDeleteArtComment
} from '@/store/moudles/comment'

interface ICommentV1Props {
  children?: ReactNode
  commentData: any
  commentChildren?: any
}

const CommentV1: React.FunctionComponent<ICommentV1Props> = ({
  commentData,
  commentChildren
}) => {
  const dispatch = useAppDispatch()
  const { loginUserId, loginUserInfo } = useAppSelector(
    (state) => ({
      loginUserId: state.user.id,
      loginUserInfo: state.user.loginUser
    }),
    shallowEqual
  )

  useEffect(() => {
    verifyAuth()
  }, [])
  const { id } = useParams()

  const [isAuthor, setIsAuthor] = useState(false)
  const [isShowReply, setIsShowReply] = useState(false)
  const [comTetx, setComtext] = useState('')

  const handleReplyBtn = () => {
    setIsShowReply((preValue) => {
      return !preValue
    })
  }

  const handleComBtn = () => {
    const type = commentData.type
    const content = comTetx
    const user_id = loginUserInfo.id
    const article_id = Number(id)
    const queryInfo = { content, user_id, article_id }

    if (type === 1) {
      // 子评论
      Object.assign(queryInfo, { parent_id: commentData.id, type: 2 })
    } else {
      console.log(commentData)

      // 子评论回复
      Object.assign(queryInfo, {
        parent_id: commentData.parent_id,
        toCommentId: commentData.id,
        type: 3
      })
    }
    console.log(queryInfo)

    dispatch(fetchCreateArtComment(queryInfo))

    // 关闭面板
    setIsShowReply(false)
  }

  const handleDeleBtn = () => {
    const id = commentData.id
    console.log('删除', id)
    dispatch(fetchDeleteArtComment(Number(id)))
  }

  //权限验证
  const verifyAuth = () => {
    const author = commentData.authorInfo.id

    if (author === loginUserId) setIsAuthor(true)
  }

  return (
    <CommentV1Wrapper>
      <div className="comment">
        <div className="author">
          <div className="left avatar-v1">
            <Link
              to={`/user/${commentData.authorInfo?.id}`}
              target="_blank"
              className="left"
            >
              <img
                src={
                  commentData.authorInfo?.avatarUrl
                    ? commentData.authorInfo?.avatarUrl
                    : '/src/assets/images/avatar_default.png'
                }
                alt=""
              />
            </Link>
          </div>

          <div className="name">{commentData.authorInfo.name}</div>

          {commentData.type == 2 ? (
            <div className="reply">
              <div className="content">{commentData.content}</div>
            </div>
          ) : (
            ''
          )}

          {commentData.type == 3 ? (
            <div className="reply">
              <span>回复</span>
              <div className="reply_name">
                {commentData?.toCommment?.authorInfo?.name}
              </div>
              <div className="content">{commentData.content}</div>
            </div>
          ) : (
            ''
          )}
        </div>

        <div className="contentWrapper">
          {commentData.type === 1 ? (
            <div className="content">{commentData.content}</div>
          ) : (
            ''
          )}

          <div className="options">
            <div className="left">
              <div className="time">{formatDate(commentData.createAt)}</div>

              <div className="reply" onClick={() => handleReplyBtn()}>
                <MessageOutlined />
                <span>回复</span>
              </div>
            </div>

            <div className="right">
              <Popover
                placement="bottom"
                arrow
                content={
                  isAuthor ? (
                    <PopoverWrapper onClick={() => handleDeleBtn()}>
                      <i>
                        <DeleteOutlined />
                      </i>
                      <span>删除</span>
                    </PopoverWrapper>
                  ) : (
                    ''
                  )
                }
              >
                <EllipsisOutlined />
              </Popover>
            </div>
          </div>

          {isShowReply ? (
            <div className="replyInput">
              <Reply_input
                TextAreaText={comTetx}
                placeholder={`回复${commentData?.authorInfo?.name}...`}
                TextAreaChange={(e) => setComtext(e.target.value)}
                comBtnClick={() => handleComBtn()}
              />
            </div>
          ) : (
            ''
          )}

          <div className="children">{commentChildren}</div>
        </div>
      </div>
    </CommentV1Wrapper>
  )
}

export default memo(CommentV1)
