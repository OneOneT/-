import { Spin, SpinProps } from 'antd'
import React, { memo } from 'react'
import type { ReactNode } from 'react'

interface ILoadingProps {
  children?: ReactNode
  size?: SpinProps['size']
  tip?: string
}

const Loading: React.FunctionComponent<ILoadingProps> = ({
  size = 'default',
  tip = '加载中···'
}) => {
  return (
    <>
      <Spin tip={tip} size={size}>
        <div className="content" />
      </Spin>
    </>
  )
}

export default memo(Loading)
