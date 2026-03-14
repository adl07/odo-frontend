import { createPatient } from "@/services/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useCreatePatients = () =>{

    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: createPatient,
        onSuccess: ()=> {queryClient.invalidateQueries({queryKey: ["createPatient"]}) }
    })
}