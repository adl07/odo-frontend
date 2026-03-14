import { useQuery } from "@tanstack/react-query";
import { getPatients } from "@/services/api";


export const usePatients =()=>{
    return useQuery({
        queryKey:["patients"],
        queryFn: getPatients
    })
}