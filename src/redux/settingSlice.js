import {
  createSlice
} from '@reduxjs/toolkit'

export const settingSlice = createSlice({
  name: 'setting',
  initialState: {
    lang: 'en',
    mode: 'Light',
    mainColor: 'Green',
  },
  reducers: {
    changeLang: (state, action) => {
      state.lang = action.payload
    },
    changeMode: (state, action) => {
      state.mode = action.payload
    },
    changeMainColor: (state, action) => {
      state.mainColor = action.payload
    },
  },
})

export const { changeLang, changeMode, changeMainColor } = settingSlice.actions
export default settingSlice.reducer
