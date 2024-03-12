import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { ConetentWrapper, ContentV1Wrapper, OptionsWrapper } from './style'
import { Tag } from 'antd'
import AuthorV1, { IPriceStyle } from '../author-v1'

interface IAuthor {
  authorData: any
  priceStyle?: IPriceStyle
  authorMidEl?: any
  authorRightEl?: any
}

interface IArticle {
  articleData: any
  articleContentEl?: any
}

interface IOptions {
  optionEl?: any
}

interface ITags {
  tagsData: []
}

interface IContentV1Props {
  children?: ReactNode
  author: IAuthor

  article: IArticle

  isShowOptions?: boolean
  option?: IOptions

  isShowTags?: boolean
  tags?: ITags
}

const ContentV1: React.FunctionComponent<IContentV1Props> = ({
  isShowOptions = true,
  isShowTags = true,
  author,
  article,
  option,
  tags
}) => {
  return (
    <ContentV1Wrapper>
      <div className="container">
        <AuthorV1 {...author} />

        <ConetentWrapper>
          <div className="title">{article.articleData?.title}</div>

          {article.articleContentEl}

          {/* 标签 */}
          {isShowTags ? (
            <div className="tags">
              {tags?.tagsData.map((item: any) => {
                return (
                  <Tag key={item.id} bordered={false}>
                    {item.name}
                  </Tag>
                )
              })}
            </div>
          ) : (
            ''
          )}
        </ConetentWrapper>
      </div>

      {isShowOptions ? (
        <OptionsWrapper>
          <div className="box like">
            <i className="icon iconfont icon-icon" />
            <span>999</span>
          </div>

          <div className="box collect">
            <i className="icon iconfont icon-shoucang" />
            <span>999</span>
          </div>

          <div className="box more">
            {option?.optionEl ? (
              option?.optionEl
            ) : (
              <i className="icon iconfont icon-gengduo" />
            )}
          </div>
        </OptionsWrapper>
      ) : (
        ''
      )}
    </ContentV1Wrapper>
  )
}

export default memo(ContentV1)
