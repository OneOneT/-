import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ICommentState } from './type'
import {
  createArtComment,
  deleteArtComment,
  getArticleComment
} from '@/services/modules/comment'
import { IThunkState } from '@/store/style'

// 获取文章评论
export const fetchArticleComment = createAsyncThunk<void, number, IThunkState>(
  'fetch/articleComent',
  async (id, { dispatch, getState }) => {
    const size = getState().comment.pageSize
    const offset = (getState().comment.currenPage - 1) * size

    const queryInfo = { size, offset }
    const res = await getArticleComment(id, queryInfo)

    dispatch(changeArticleCommentAction(res))
  }
)

// 创建评论
export const fetchCreateArtComment = createAsyncThunk<void, any, IThunkState>(
  'fetch/createArtComment',
  async (queryInfo, { dispatch }) => {
    const { article_id } = queryInfo
    await createArtComment(queryInfo)

    // 重新加载评论
    dispatch(fetchArticleComment(article_id))
  }
)

// 删除评论
export const fetchDeleteArtComment = createAsyncThunk<
  void,
  number,
  IThunkState
>('fetch/deleteArtComment', async (id, { dispatch, getState }) => {
  const article_id = getState().article.articleInfo.id

  await deleteArtComment(id)

  // 重新加载评论
  dispatch(fetchArticleComment(article_id))
})

const initialState: ICommentState = {
  articleComment: [],
  currenPage: 1,
  pageSize: 3
}

const commentStore = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    changeCurrentPageAction(state, { payload }) {
      state.currenPage = payload
    },
    changeArticleCommentAction(state, { payload }) {
      state.articleComment = payload
    }
  }
})

export const { changeArticleCommentAction, changeCurrentPageAction } =
  commentStore.actions
export default commentStore.reducer
