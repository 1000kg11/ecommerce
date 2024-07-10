import { createSlice } from '@reduxjs/toolkit'
import Search from 'antd/es/transfer/search'


const initialState = {
    search: '',
}



export const productSlide = createSlice({
  name: 'product',
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.search += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { searchProduct } = productSlide.actions

export default productSlide.reducer