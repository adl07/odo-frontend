"use client"


import Link from "next/link"
import { Eye, MoreHorizontal } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePatients } from "@/hooks/getPatients"
import { useEffect } from "react"

const recentConsultations = [
  {
    id: "1",
    patientName: "Maria Garcia",
    dni: "12345678A",
    date: "2026-03-07",
    reason: "Routine Checkup",
    diagnosis: "Healthy teeth",
    status: "completed",
  },
  {
    id: "2",
    patientName: "John Smith",
    dni: "87654321B",
    date: "2026-03-07",
    reason: "Tooth Pain",
    diagnosis: "Cavity in molar",
    status: "completed",
  },
  {
    id: "3",
    patientName: "Ana Martinez",
    dni: "11223344C",
    date: "2026-03-07",
    reason: "Teeth Cleaning",
    diagnosis: "Professional cleaning done",
    status: "in-progress",
  },
  {
    id: "4",
    patientName: "Carlos Rodriguez",
    dni: "44332211D",
    date: "2026-03-07",
    reason: "Crown Fitting",
    diagnosis: "Pending",
    status: "scheduled",
  },
  {
    id: "5",
    patientName: "Laura Johnson",
    dni: "55667788E",
    date: "2026-03-06",
    reason: "Root Canal",
    diagnosis: "Successful procedure",
    status: "completed",
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "completed":
      return <Badge variant="secondary" className="bg-success/10 text-success hover:bg-success/20">Completed</Badge>
    case "in-progress":
      return <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">In Progress</Badge>
    case "scheduled":
      return <Badge variant="secondary">Scheduled</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export function RecentConsultations() {

  const {data, isLoading, error} = usePatients();
  const doctorId = localStorage.getItem('doctor_id')

  useEffect(()=>{

  },[data])


  if(isLoading) return <p>Cargando...</p>
  if(error) return <p>Error al cargar los pacientes</p>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Consultas Recientes</CardTitle>
        <CardAction>
          <Button variant="outline" size="sm" asChild>
            <Link href="/consultations">Ver Todas</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Paciente</TableHead>
              <TableHead className="hidden sm:table-cell">DNI</TableHead>
              <TableHead className="hidden md:table-cell">Motivo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.filter((patient)=> patient.doctorid.includes(doctorId)).map((consultation) => (
              <TableRow key={consultation.id}>
                <TableCell>
                  <div className="font-medium">{consultation.nombre}</div>
                  <div className="text-xs text-muted-foreground md:hidden">
                    {consultation.dni}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground">
                  {consultation.dni}
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  {consultation.dni}
                </TableCell>
                <TableCell>{getStatusBadge(consultation.nombre)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm">
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">Acciones</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/consultations/${consultation.id}`}>
                          <Eye className="mr-2 size-4" />
                          Ver Detalle
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
