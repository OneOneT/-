import React, { memo, useEffect } from 'react'
import type { ReactNode } from 'react'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchTagList } from '@/store/moudles/tag'
import HomeTop from './cpns/home-top'
import HomeContent from './cpns/home-content'
import { HomeWrapper } from './style'

interface IHomeProps {
  children?: ReactNode
}

const Home: React.FunctionComponent<IHomeProps> = () => {
  const dispatch = useAppDispatch()
  const { tagList } = useAppSelector(
    (state) => ({
      tagList: state.tag.taglist
    }),
    shallowEqual
  )

  useEffect(() => {
    dispatch(fetchTagList())
  }, [])

  return (
    <HomeWrapper>
      <div className="wrapper-v1">
        <HomeTop tagList={tagList} />

        <HomeContent />
      </div>
    </HomeWrapper>
  )
}

export default memo(Home)
