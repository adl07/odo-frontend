"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { Eye, Edit, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getPatients } from "@/services/api"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"

const consultations = [
  {
    id: "1",
    patientName: "Maria Garcia",
    dni: "12345678A",
    date: "2026-03-07",
    reason: "Routine Checkup",
    diagnosis: "Healthy teeth, minor plaque buildup",
    status: "completed",
  },
  {
    id: "2",
    patientName: "John Smith",
    dni: "87654321B",
    date: "2026-03-07",
    reason: "Tooth Pain",
    diagnosis: "Cavity in lower right molar",
    status: "completed",
  },
  {
    id: "3",
    patientName: "Ana Martinez",
    dni: "11223344C",
    date: "2026-03-07",
    reason: "Teeth Cleaning",
    diagnosis: "Professional cleaning completed",
    status: "in-progress",
  },
  {
    id: "4",
    patientName: "Carlos Rodriguez",
    dni: "44332211D",
    date: "2026-03-07",
    reason: "Crown Fitting",
    diagnosis: "Crown placement scheduled",
    status: "scheduled",
  },
  {
    id: "5",
    patientName: "Laura Johnson",
    dni: "55667788E",
    date: "2026-03-06",
    reason: "Root Canal",
    diagnosis: "Root canal treatment successful",
    status: "completed",
  },
  {
    id: "6",
    patientName: "Pedro Sanchez",
    dni: "66778899F",
    date: "2026-03-06",
    reason: "Filling",
    diagnosis: "Composite filling placed",
    status: "completed",
  },
  {
    id: "7",
    patientName: "Isabella Lopez",
    dni: "77889900G",
    date: "2026-03-05",
    reason: "Extraction",
    diagnosis: "Wisdom tooth extraction",
    status: "completed",
  },
  {
    id: "8",
    patientName: "Miguel Torres",
    dni: "88990011H",
    date: "2026-03-05",
    reason: "Whitening",
    diagnosis: "Professional whitening treatment",
    status: "completed",
  },
  {
    id: "9",
    patientName: "Sofia Ramirez",
    dni: "99001122I",
    date: "2026-03-04",
    reason: "Routine Checkup",
    diagnosis: "Good oral health maintained",
    status: "completed",
  },
  {
    id: "10",
    patientName: "David Morales",
    dni: "00112233J",
    date: "2026-03-04",
    reason: "Tooth Pain",
    diagnosis: "Abscess treatment required",
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

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function ConsultationsTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(consultations.length / itemsPerPage)
  const [patients, setPatients] = useState([]);

  const filterPatient = useSelector((state: RootState) => state.valueFilter.value)
  const doctorId = localStorage.getItem('doctor_id')

  

  const handlePatients = useCallback(()=>{
      if(!filterPatient) return;
      
  },[])

  useEffect(()=>{
    const loadingPatients = async ()=>{
      const getAllPatients = await getPatients();
      setPatients(getAllPatients || [])
    }

    loadingPatients();

  },[])
  

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Paciente</TableHead>
              <TableHead className="hidden sm:table-cell">DNI</TableHead>
              <TableHead className="hidden md:table-cell">Fecha</TableHead>
              <TableHead className="hidden lg:table-cell">Motivo</TableHead>
              <TableHead className="hidden xl:table-cell">Diagnostico</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.filter((p)=> p.doctorid?.includes(doctorId) && (!filterPatient || p.dni?.includes(filterPatient))).map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{patient.nombre}</div>
                    <div className="text-xs text-muted-foreground sm:hidden">
                      {patient.dni}
                    </div>
                    <div className="text-xs text-muted-foreground md:hidden">
                      {formatDate(patient.fecha)}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground">
                  {patient.dni}
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  {formatDate(patient.fecha)}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {patient.nombre}
                </TableCell>
                <TableCell className="hidden xl:table-cell text-muted-foreground max-w-[200px] truncate">
                  {patient.descripcion}
                </TableCell>
                <TableCell>{getStatusBadge(patient.dni)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm">
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/consultations/${patient.id}`}>
                          <Eye className="mr-2 size-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/consultations/${patient.id}/edit`}>
                          <Edit className="mr-2 size-4" />
                          Edit Consultation
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between border-t px-4 py-3">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, consultations.length)} of{" "}
            {consultations.length} consultations
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="size-4" />
              <span className="sr-only">Previous page</span>
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="size-4" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
