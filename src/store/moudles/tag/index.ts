import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ITagState } from './type'

import { getTagList } from '@/services/modules/tag'

// 获取标签列表
export const fetchTagList = createAsyncThunk(
  'fetch/tagList',
  async (extraInfo, { dispatch }) => {
    const res = await getTagList(extraInfo)
    dispatch(chanegtagListAction(res))
  }
)

const initialState: ITagState = {
  taglist: [],
  tagTotail: 0
}

const tagStore = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    chanegtagListAction(state, { payload }) {
      state.taglist = payload.list
      state.tagTotail = payload.totail
    }
  }
})

export const { chanegtagListAction } = tagStore.actions
export default tagStore.reducer
