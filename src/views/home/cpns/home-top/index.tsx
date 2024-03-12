import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { Button, Carousel } from 'antd'
import { HomeTopWrapper } from './style'

interface IHomeTopProps {
  children?: ReactNode
  tagList: any[]
}

const HomeTop: React.FunctionComponent<IHomeTopProps> = ({ tagList }) => {
  return (
    <HomeTopWrapper>
      {/* 轮播图 */}
      <div className="carousel">
        <Carousel autoplay>
          <img
            className="image"
            src="/src/assets/images/carousel/1.png"
            alt=""
          />
          <img
            className="image"
            src="/src/assets/images/carousel/1.png"
            alt=""
          />
        </Carousel>
      </div>

      <div className="hot">
        <h3 className="title">社区热点</h3>
        <div className="tag">
          {tagList.map((item) => {
            return (
              <Button key={item.id} ghost className="btn-v1 tag-item">
                {item.name}
              </Button>
            )
          })}
        </div>

        <div className="order">123</div>
      </div>
    </HomeTopWrapper>
  )
}

export default memo(HomeTop)
