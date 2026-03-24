import {configureStore} from '@reduxjs/toolkit'
import valueFilterSlice from './valueFilterSlice'
import countPatientSlice from './valuePatientsSlice'


export const store = configureStore({
    reducer:{
        valueFilter: valueFilterSlice,
        valueTotalPatient: countPatientSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch