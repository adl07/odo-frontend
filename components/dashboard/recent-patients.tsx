import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const recentPatients = [
  {
    id: "1",
    name: "Maria Garcia",
    lastVisit: "Today",
    reason: "Routine Checkup",
  },
  {
    id: "2",
    name: "John Smith",
    lastVisit: "Today",
    reason: "Tooth Pain",
  },
  {
    id: "3",
    name: "Ana Martinez",
    lastVisit: "Today",
    reason: "Teeth Cleaning",
  },
  {
    id: "4",
    name: "Carlos Rodriguez",
    lastVisit: "Yesterday",
    reason: "Crown Fitting",
  },
  {
    id: "5",
    name: "Laura Johnson",
    lastVisit: "Yesterday",
    reason: "Root Canal",
  },
]

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

export function RecentPatients() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recently Attended</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentPatients.map((patient) => (
            <Link
              key={patient.id}
              href={`/consultations?patient=${encodeURIComponent(patient.name)}`}
              className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50 -mx-2"
            >
              <Avatar className="size-9">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {getInitials(patient.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{patient.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {patient.reason}
                </p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {patient.lastVisit}
              </span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
