
import { AppDispatch } from "../store/store";
import { setValue, clearValue } from "@/store/valueFilterSlice";
import { useDispatch } from "react-redux";

export interface filterConsultProps{
    value: string[] | null
}

export const useFilterConsult = () =>{

    const dispatch = useDispatch<AppDispatch>()

    const filterValues = (value: string[] | null) =>{
         //seteo el valor del reducer con el dispacth
        const validValue = value?.filter(Boolean)[0]
        if(validValue){
            dispatch(setValue(validValue))
            return true
        }   
            dispatch(clearValue())
            return false
        }
        
        return {filterValues} 
}