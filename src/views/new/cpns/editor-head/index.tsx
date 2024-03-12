import React, { forwardRef, memo, useImperativeHandle, useState } from 'react'
import type { ReactNode } from 'react'
import { Button, Input, Tooltip } from 'antd'
import { EditorHeadWrapper } from './style'
import { SwapOutlined } from '@ant-design/icons'

export interface IEditorHeadRef {}

interface IEditorHeadProps {
  children?: ReactNode
  titleData: string
  isMd: boolean
  pubiclClick: () => void
  typeClick: () => void
  changeTitle: (e: any) => void
}

const EditorHead: React.ForwardRefRenderFunction<
  IEditorHeadRef,
  IEditorHeadProps
> = ({ titleData = '', changeTitle, pubiclClick, typeClick, isMd }, ref) => {
  // useImperativeHandle(ref, () => {
  //   return {}
  // })

  return (
    <EditorHeadWrapper>
      <div className="head">
        <div className="title">
          <Input
            value={titleData}
            onChange={(e) => changeTitle(e)}
            placeholder="请输入文章标题..."
          />
        </div>
        <div className="options">
          <div
            className="changeType"
            onClick={() => {
              typeClick()
            }}
          >
            <Tooltip
              placement="bottom"
              arrow
              title={`切换为${isMd ? '富文本编辑器' : 'Markdown编辑器'}`}
            >
              <SwapOutlined />
            </Tooltip>
          </div>

          <Button
            type="primary"
            onClick={() => {
              pubiclClick()
            }}
          >
            发布
          </Button>
        </div>
      </div>
    </EditorHeadWrapper>
  )
}

export default memo(forwardRef(EditorHead))
