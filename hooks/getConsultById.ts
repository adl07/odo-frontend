import { getConsultById } from "@/services/api"
import { useQuery } from "@tanstack/react-query"


export const useConsultById = (id: string) =>{
    return useQuery({
        queryKey: ["patientId", id],
        queryFn: () => getConsultById(id),
        enabled: !!id
    })
}