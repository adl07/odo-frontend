import {configureStore} from '@reduxjs/toolkit'
import valueFilterSlice from './valueFilterSlice'


export const store = configureStore({
    reducer:{
        valueFilter: valueFilterSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch