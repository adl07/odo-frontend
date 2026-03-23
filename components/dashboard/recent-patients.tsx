"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { usePatients } from "@/hooks/getPatients"



function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

export function RecentPatients() {

   const {data, isLoading, error} = usePatients();

   const doctorId = localStorage.getItem('doctor_id')

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recién Atendidos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data && data.filter((p) => p.doctorid === doctorId).map((patient) => (
            <Link
              key={patient.id}
              href={`/consultations?patient=${encodeURIComponent(patient.nombre)}`}
              className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50 -mx-2"
            >
              <Avatar className="size-9">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {getInitials(patient.nombre)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{patient.nombre}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {patient.descipcion}
                </p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                
              </span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
