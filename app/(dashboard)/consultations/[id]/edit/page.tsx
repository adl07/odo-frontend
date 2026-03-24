"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Topbar } from "@/components/topbar"
import { Button } from "@/components/ui/button"
import { EditConsultationForm } from "@/components/consultations/edit-consultation-form"
import { useConsultById } from "@/hooks/getConsultById"
import { use, useEffect } from "react"

export default function EditConsultationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params) 

   const {data, isLoading, error} = useConsultById(id)

   useEffect(()=>{

   },[data])
  
  return (
    <>
      <Topbar 
        title="Edit Consultation" 
        description={`Editando Consulta #${id}`} 
      />
      <div className="flex-1 overflow-auto p-4 lg:p-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/consultations/${id}`}>
                <ArrowLeft className="size-4 mr-2" />
                Volver al Detalle
              </Link>
            </Button>
          </div>
          {isLoading && <p>Cargando...</p>}
          {data && <EditConsultationForm consultationId={id} dataConsultation={data} />}
        </div>
      </div>
    </>
  )
}
