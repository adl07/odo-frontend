import { Topbar } from "@/components/topbar"
import { ConsultationForm } from "@/components/consultations/consultation-form"

export default function NewConsultationPage() {
  return (
    <>
      <Topbar 
        title="Nueva Consulta" 
        description="Registre la nueva consulta dental" 
      />
      <div className="flex-1 overflow-auto p-4 lg:p-6">
        <div className="mx-auto max-w-3xl">
          <ConsultationForm />
        </div>
      </div>
    </>
  )
}
