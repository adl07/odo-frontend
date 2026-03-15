import { Topbar } from "@/components/topbar"
import { DashboardStats } from "@/components/dashboard/stats"
import { RecentConsultations } from "@/components/dashboard/recent-consultations"
import { RecentPatients } from "@/components/dashboard/recent-patients"
import { QuickActions } from "@/components/dashboard/quick-actions"


export default function DashboardPage() {
  return (
    <>
      <Topbar 
        title="Dashboard" 
        description="Descripción general de sus atenciones" 
      />
      <div className="flex-1 overflow-auto p-4 lg:p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <DashboardStats />
          
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <RecentConsultations />
            </div>
            <div className="space-y-6">
              <QuickActions />
              <RecentPatients />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
