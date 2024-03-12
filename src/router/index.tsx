import React from 'react'

import { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

const Home = lazy(() => import('@/views/home'))
const Login = lazy(() => import('@/views/login'))
const User = lazy(() => import('@/views/user'))
const Article = lazy(() => import('@/views/article'))
const New = lazy(() => import('@/views/new'))
const Setting = lazy(() => import('@/views/setting'))
const Password = lazy(() => import('@/views/setting/cpns/password'))
const UserInfo = lazy(() => import('@/views/setting/cpns/userInfo'))
const Category = lazy(() => import('@/views/category'))

const NotFount = lazy(() => import('@/views/not-fount'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/home" />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/user/:id',
    element: <User />
  },
  {
    path: '/article/:id',
    element: <Article />
  },
  {
    path: '/article/:id/edit',
    element: <New />
  },
  {
    path: '/new',
    element: <New />
  },
  {
    path: '/setting',
    element: <Setting />,
    children: [
      {
        path: '/setting',
        element: <Navigate to={'/setting/userInfo'} />
      },
      {
        path: '/setting/userInfo',
        element: <UserInfo />
      },
      {
        path: '/setting/password',
        element: <Password />
      }
    ]
  },
  {
    path: '/category/:id',
    element: <Category />
  },
  {
    path: '*',
    element: <NotFount />
  }
]

export default routes
