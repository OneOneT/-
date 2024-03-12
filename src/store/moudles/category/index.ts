import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ICategoryState } from './type'
import {
  getCategoryArticleList,
  getCategoryById,
  getCategoryList
} from '@/services/modules/category'

// 获取某个分类标签
export const fetchCategoryInfo = createAsyncThunk<void, number>(
  'fetch/categoryInfo',
  async (id, { dispatch }) => {
    const categoryInfoRes = await getCategoryById(id)
    dispatch(getCurrentCagegoryAction(categoryInfoRes))
  }
)

// 获取分类列表
export const fetchCategoryList = createAsyncThunk(
  'fetch/categoryList',
  async (extraInfo, { dispatch }) => {
    const res = await getCategoryList(extraInfo)
    dispatch(chanegCategoryListAction(res))
  }
)

//获取分类文章列表
export const fetchCategoryArticleList = createAsyncThunk<void, any>(
  'fetch/categoryArtilceList',
  async ({ id, queryInfo }, { dispatch }) => {
    const res = await getCategoryArticleList(id, queryInfo)

    dispatch(getCategoryArticleListAction(res))
  }
)

const initialState: ICategoryState = {
  categorylist: [],
  categoryTotail: 0,

  currentCategory: {},
  categoryArticleList: [],
  categoryArticleListTotail: 0
}

const categoryStore = createSlice({
  name: 'category',
  initialState,
  reducers: {
    chanegCategoryListAction(state, { payload }) {
      state.categorylist = payload.list
      state.categoryTotail = payload.totail
    },
    getCurrentCagegoryAction(state, { payload }) {
      state.currentCategory = payload
    },
    getCategoryArticleListAction(state, { payload }) {
      state.categoryArticleList = payload.list
      state.categoryArticleListTotail = payload.totail
    }
  }
})

export const {
  chanegCategoryListAction,
  getCurrentCagegoryAction,
  getCategoryArticleListAction
} = categoryStore.actions
export default categoryStore.reducer
