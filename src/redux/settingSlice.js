import {
  createSlice
} from '@reduxjs/toolkit'

export const settingSlice = createSlice({
  name: 'setting',
  initialState: {
    lang: 'en',
  },
  reducers: {
    changeLang: (state, action) => {
      state.lang = action.payload
    },
  },
})

export const { changeLang } = settingSlice.actions
export default settingSlice.reducer
