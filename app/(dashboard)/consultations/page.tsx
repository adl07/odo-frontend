
import { Topbar } from "@/components/topbar"
import { ConsultationFilters } from "@/components/consultations/consultation-filters"
import { ConsultationsTable } from "@/components/consultations/consultations-table"

export default function ConsultationsPage() {
  return (
    <>
      <Topbar 
        title="Historial de consultas" 
        description="Ver y gestionar todas las consultas de los pacientes" 
      />
      <div className="flex-1 overflow-auto p-4 lg:p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <ConsultationFilters />
          <ConsultationsTable />
        </div>
      </div>
    </>
  )
}
