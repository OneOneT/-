import { Button, Result } from 'antd'
import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface INotFountProps {
  children?: ReactNode
}

const NotFount: React.FunctionComponent<INotFountProps> = () => {
  const navigate = useNavigate()

  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => navigate('/home')}>
            Back Home
          </Button>
        }
      />
    </>
  )
}

export default memo(NotFount)
