import Link from "next/link"
import { Plus, Search, Calendar, FileText } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const quickActions = [
  {
    title: "New Consultation",
    href: "/consultations/new",
    icon: Plus,
    description: "Register a new dental consultation",
  },
  {
    title: "Search Records",
    href: "/consultations",
    icon: Search,
    description: "Find patient consultations",
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {quickActions.map((action) => (
          <Button
            key={action.href}
            variant="outline"
            className="h-auto justify-start gap-3 p-4"
            asChild
          >
            <Link href={action.href}>
              <div className="rounded-md bg-primary/10 p-2">
                <action.icon className="size-4 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-medium">{action.title}</div>
                <div className="text-xs text-muted-foreground font-normal">
                  {action.description}
                </div>
              </div>
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
