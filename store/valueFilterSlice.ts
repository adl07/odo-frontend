import {createSlice } from '@reduxjs/toolkit'

interface FilterState {
    value: string
}
const initialState: FilterState = { value: "" }

export const valueFilterSlice = createSlice({

    name: "valueFilter",
    initialState: initialState,
    reducers: {
        setValue: (state, action)=>{
            state.value = action.payload
        },
        clearValue: (state) =>{
            state.value = ""
        }
    }
})

export const {setValue, clearValue} = valueFilterSlice.actions
export default valueFilterSlice.reducer