import { Calendar, Users, Clock, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    title: "Consultas de hoy",
    value: "8",
    description: "3 completed, 5 remaining",
    icon: Calendar,
    trend: "+12%",
    trendUp: true,
  },
  {
    title: "Total de Pacientes",
    value: "1,284",
    description: "+24 this month",
    icon: Users,
    trend: "+8%",
    trendUp: true,
  }
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold tracking-tight">
                    
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      stat.trendUp ? "text-success" : "text-destructive"
                    }`}
                  >
                    
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  
                </p>
              </div>
              <div className="rounded-lg bg-primary/10 p-2.5">
                <stat.icon className="size-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
