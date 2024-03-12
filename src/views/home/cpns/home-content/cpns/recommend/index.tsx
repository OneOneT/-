import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { RecommendMore, RecommendWrapper, UserList } from './styld'
import { Button } from 'antd'

interface IRecommendProps {
  children?: ReactNode
}

const Recommend: React.FunctionComponent<IRecommendProps> = () => {
  return (
    <RecommendWrapper>
      <div className="title">
        <span className="name">推荐关注</span>
        <span className="change">换一批</span>
      </div>

      <UserList>
        <div className="item">
          <div className="price">
            <img
              src="/src/assets/images/15632474323491.jpeg"
              alt=""
              srcSet=""
            />
          </div>

          <div className="des">
            <div className="name">123</div>
            <div className="expertise">
              <span>擅长领域:</span>
              <span>123</span>
            </div>
          </div>

          <Button className="follow" type="primary">
            关注
          </Button>
        </div>
      </UserList>

      <RecommendMore>
        <span>查看更多</span>
      </RecommendMore>
    </RecommendWrapper>
  )
}

export default memo(Recommend)
