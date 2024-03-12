import React, { Suspense } from 'react'

import { useLocation, useRoutes } from 'react-router-dom'
import routes from './router'

import MainHeader from './components/main-header'
import MainFooter from './components/main-footer'
import Loading from './components/loading'
import Login from './views/login'
import { useAppDispatch } from './store'
import { loadLocalUserInfo } from './store/moudles/user'

function App() {
  const dispatch = useAppDispatch()

  const localhost = useLocation()
  const currentPath = localhost.pathname

  // 加载本地数据到redux
  dispatch(loadLocalUserInfo())

  if (currentPath === '/login') {
    return (
      <>
        <Suspense fallback={<Loading size="large" />}>
          <Login />
        </Suspense>
      </>
    )
  } else {
    return (
      <>
        <MainHeader />
        <Suspense fallback={<Loading size="large" />}>
          {useRoutes(routes)}
        </Suspense>
        <MainFooter />
      </>
    )
  }
}

export default App
