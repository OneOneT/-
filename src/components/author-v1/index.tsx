import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { AuthorV1Wrapper } from './style'

export interface IPriceStyle {
  height?: string
  width?: string
}

interface IAuthorV1Props {
  children?: ReactNode
  authorData?: any

  priceStyle?: IPriceStyle
  authorMidEl?: any
  authorRightEl?: any
}

const AuthorV1: React.FunctionComponent<IAuthorV1Props> = ({
  authorData,
  priceStyle = { height: '50px', width: '50px' },
  authorMidEl,
  authorRightEl
}) => {
  return (
    <AuthorV1Wrapper>
      <div className="author-container">
        <Link to={`/user/${authorData?.id}`} target="_blank" className="left">
          <img
            style={{ ...priceStyle }}
            src={
              authorData?.avatarUrl
                ? authorData?.avatarUrl
                : '/src/assets/images/avatar_default.png'
            }
            alt=""
          />
        </Link>

        <div className="mid">
          <Link to={`/user/${authorData?.id}`} target="_blank" className="name">
            {authorData?.name}
          </Link>

          <div className="mid-order">
            {authorMidEl ? authorMidEl : <>&nbsp;</>}
          </div>
        </div>

        <div className="rigth">{authorRightEl ? authorRightEl : ''}</div>
      </div>
    </AuthorV1Wrapper>
  )
}

export default memo(AuthorV1)
