import React, { forwardRef, memo, useImperativeHandle, useState } from 'react'
import type { ReactNode } from 'react'
import { ContentMdWrapper } from './style'

import { MdEditor } from 'md-editor-rt'
import 'md-editor-rt/lib/style.css'

export interface IContentMdRef {
  getText: () => string
}

interface IContentMdProps {
  children?: ReactNode
  initConetnt: string
}

const ContentMd: React.ForwardRefRenderFunction<
  IContentMdRef,
  IContentMdProps
> = ({ initConetnt }, ref) => {
  useImperativeHandle(ref, () => ({
    getText() {
      return text
    }
  }))

  const [text, setText] = useState(initConetnt ?? '')

  return (
    <ContentMdWrapper>
      <div>
        <MdEditor modelValue={text} onChange={setText} />
      </div>
    </ContentMdWrapper>
  )
}

export default memo(forwardRef(ContentMd))
