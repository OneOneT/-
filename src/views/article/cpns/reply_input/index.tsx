import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { Button } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { ReplyInputWrapper } from './style'

interface IReplyInputProps {
  children?: ReactNode
  placeholder?: string
  TextAreaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  comBtnClick: () => void
  TextAreaText: string
}

const ReplyInput: React.FunctionComponent<IReplyInputProps> = ({
  placeholder = '平等表达 友善交流',
  comBtnClick,
  TextAreaChange,
  TextAreaText
}) => {
  return (
    <ReplyInputWrapper>
      <TextArea
        value={TextAreaText}
        className="textArea"
        showCount
        placeholder={placeholder}
        maxLength={100}
        onChange={(e) => {
          TextAreaChange(e)
        }}

        // style={{ resize: 'none' }}
      />
      <Button
        type="primary"
        className="btn"
        disabled={TextAreaText.length ? false : true}
        onClick={() => {
          comBtnClick()
        }}
      >
        评论
      </Button>
    </ReplyInputWrapper>
  )
}

export default memo(ReplyInput)
