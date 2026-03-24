import { createSlice } from "@reduxjs/toolkit";


interface totalPatientsInterface{
    count: number
}
const initialState : totalPatientsInterface = {count: 0}
export const countPatientSlice = createSlice({
    name: "totalPatients",
    initialState: initialState,
    reducers: {
        setCountPatient: (state, action) =>{
            state.count = action.payload
        },
        clearCountPatient: (state) =>{
            state.count = 0
        }
    }

})
export const {setCountPatient, clearCountPatient} = countPatientSlice.actions
export default countPatientSlice.reducer