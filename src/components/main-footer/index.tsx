import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { MainFooterWrapper } from './style'

interface IMainFooterProps {
  children?: ReactNode
}

const MainFooter: React.FunctionComponent<IMainFooterProps> = () => {
  return (
    <MainFooterWrapper>
      <div className="wrapper-v2">
        <div className="links">
          <ul>
            <li>
              <a href="/">社区规则</a>
            </li>
            <li>
              <a href="/">加入社区</a>
            </li>
            <li>
              <a href="/">活跃会员</a>
            </li>
            <li>
              <a href="/">产品列表</a>
            </li>
            <li>
              <a href="/">友链</a>
            </li>
          </ul>
        </div>

        <div className="copyright">
          <span>
            独立开发者社区，始于2024.01，致力于搭建和维护好国内独立开发者圈子和氛围。
          </span>
        </div>
      </div>
    </MainFooterWrapper>
  )
}

export default memo(MainFooter)
