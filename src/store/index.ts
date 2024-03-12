import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import userStore from './moudles/user'
import articleStore from './moudles/article'
import categoryStore from './moudles/category'
import tagStore from './moudles/tag'
import commentStore from './moudles/comment'

const store = configureStore({
  reducer: {
    user: userStore,
    article: articleStore,
    category: categoryStore,
    tag: tagStore,
    comment: commentStore
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store
