import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { IArticleState } from './type'
import type { IThunkState } from '@/store/style'
import {
  createArticle,
  deleteArticle,
  getArticleDetail,
  getArticleList,
  getArticleListByUserId,
  updateArticle
} from '@/services/modules/article'

interface ILIMIT {
  size?: number
  offset?: number
}

// 获取全部文章列表
export const fetchArticleList = createAsyncThunk<void, ILIMIT>(
  'fetch/articleList',
  async (queryInfo, { dispatch }) => {
    const res = await getArticleList(queryInfo)

    dispatch(getArticleListAction(res))
  }
)

// 获取某个用户的文章列表
export const fetchUserArticleList = createAsyncThunk<void, any>(
  'fetch/userArticleList',
  async ({ id, queryInfo }, { dispatch }) => {
    const res = await getArticleListByUserId(Number(id), queryInfo)

    dispatch(getArticleListByUserIdAction(res))
  }
)

// 获取文章详情
export const fetchArticleDetail = createAsyncThunk<void, number>(
  'fetch/articleDetail',
  async (id, { dispatch }) => {
    const res = await getArticleDetail(id)
    dispatch(getArticleDetailAction(res))
  }
)

// 发表文章
export const fetchCreateArticle = createAsyncThunk<void, any>(
  'fetch/createArticle',
  async (extraInfo) => {
    const res = await createArticle(extraInfo)
    return res
  }
)

// 删除文章
export const fetchDeleteArticle = createAsyncThunk<void, number>(
  'fetch/deleteArticle',
  async (id) => {
    await deleteArticle(id)
  }
)

// 更新文章
export const fetchUpdateArticle = createAsyncThunk<void, any>(
  'fetch/updateArticle',
  async ({ id, queryInfo }) => {
    console.log(id, queryInfo)

    await updateArticle(id, queryInfo)
  }
)

const initialState: IArticleState = {
  articleList: [],
  articleListTotail: 0,
  userArticleList: [],
  articleInfo: {} //文章详情
}

const ArticleStore = createSlice({
  name: 'article',
  initialState,
  reducers: {
    initArticleListAction(state) {
      state.articleList = []
    },

    initUserArticleList(state) {
      state.userArticleList = []
    },

    getArticleListAction(state, { payload }) {
      const { totail, list } = payload

      const newArr = [...state.articleList, ...list]

      state.articleList = newArr
      state.articleListTotail = totail
    },

    getArticleListByUserIdAction(state, { payload }) {
      const newArr = [...state.userArticleList, ...payload]

      state.userArticleList = newArr
    },

    getArticleDetailAction(state, { payload }) {
      state.articleInfo = payload
    },

    chanageArticleListPageAction(state, { payload }) {
      state.articlePage = payload
    }
  }
})

export const {
  getArticleListAction,
  getArticleListByUserIdAction,
  getArticleDetailAction,
  chanageArticleListPageAction,
  initArticleListAction,
  initUserArticleList
} = ArticleStore.actions
export default ArticleStore.reducer
