import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { PanelWrapper } from './style'
import { Link } from 'react-router-dom'

interface IPanelProps {
  children?: ReactNode
  contentList: any[]
}

const Panel: React.FunctionComponent<IPanelProps> = ({ contentList }) => {
  return (
    <PanelWrapper>
      <div className="list">
        {contentList.map((item) => {
          return (
            <Link
              to={`/category/${item.id}`}
              key={item.id}
              className="list-item"
            >
              {item.name}
            </Link>
          )
        })}
      </div>
    </PanelWrapper>
  )
}

export default memo(Panel)
