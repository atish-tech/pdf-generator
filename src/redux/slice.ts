import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
    name: 'addProduct',
    initialState: {
        isOpenDialog: false
    },
    reducers: {
        openAddProductDialog: state => {
            state.isOpenDialog = true
        },
        closeAddProductDialog: state => {
            state.isOpenDialog = false
        },
        
    }
})

// Action creators are generated for each case reducer function
export const { openAddProductDialog, closeAddProductDialog } = productSlice.actions

export default productSlice.reducer