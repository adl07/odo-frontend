import { ConsultInterface, updateConsultById } from "@/services/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useUpdateConsultId=()=>{

    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: ({id, data}: {id: string, data: ConsultInterface}) => updateConsultById(id, data),
        onSuccess: (_, variables) => {queryClient.invalidateQueries({queryKey: ["patientId", variables.id]})}
    })
}