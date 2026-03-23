import { deletePatientById } from "@/services/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useDeletePatient=()=>{

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({id}: {id: string}) => deletePatientById(id),
        onSuccess: () =>{queryClient.invalidateQueries({queryKey: ["patients"]})}
    })
}