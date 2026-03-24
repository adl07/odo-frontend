"use client"

import Link from "next/link"
import { ArrowLeft, Edit, Calendar, User, FileText, Paperclip, Download } from "lucide-react"

import { Topbar } from "@/components/topbar"
import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useConsultById } from "@/hooks/getConsultById"
import { use } from "react"
import { da, es } from "date-fns/locale"
import { format, parseISO } from "date-fns"

// This would typically come from a database
const consultation = {
  id: "1",
  patientName: "Maria Garcia",
  dni: "12345678A",
  date: "2026-03-07",
  reason: "Routine Checkup",
  diagnosis: "Overall healthy teeth with minor plaque buildup on the lower front teeth. No cavities detected. Gums appear healthy with no signs of gingivitis.",
  treatment: "Professional cleaning performed. Scaling and polishing completed. Fluoride treatment applied.",
  observations: "Patient advised to improve brushing technique for lower front teeth. Recommended using an electric toothbrush. Next checkup scheduled in 6 months.",
  status: "completed",
  attachments: [
    { id: "1", name: "X-ray_panoramic.jpg", type: "image", size: "2.4 MB" },
    { id: "2", name: "Treatment_plan.pdf", type: "document", size: "156 KB" },
  ],
  createdAt: "2026-03-07T09:30:00",
  updatedAt: "2026-03-07T10:15:00",
}

function getInitials(name: string) {
  if(name){
    return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
  }
  
}

function formatDate(dateString: string) {
  return format(parseISO(dateString), "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })
}

function formatDateTime(dateString: string) {
  return new Date(dateString).toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit", 
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function ConsultationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)

  const {data, isLoading, error} = useConsultById(id)

  return (
    <>
      <Topbar 
        title="Detalle de la Consulta" 
        description={`Consulta #${id}`} 
      />
      <div className="flex-1 overflow-auto p-4 lg:p-6">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Back button and actions */}
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/consultations">
                <ArrowLeft className="size-4 mr-2" />
                Volver al historial
              </Link>
            </Button>
            <Button asChild>
              <Link href={`/consultations/${id}/edit`}>
                <Edit className="size-4 mr-2" />
                Editar Consulta
              </Link>
            </Button>
          </div>

          {/* Patient Information Card */}
          {
            data && (
              <>
                <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="size-5" />
                Información del Paciente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <Avatar className="size-16">
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">
                    {getInitials(data.nombre)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Nombre del Paciente</p>
                    <p className="font-medium">{data.nombre}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">DNI</p>
                    <p className="font-medium">{data.dni}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Día de la Consulta</p>
                    <p className="font-medium">{formatDate(data.fecha)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Clinical Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="size-5" />
                Información Medica
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Motivo de la consulta</p>
                <p className="text-base">{data.motivo}</p>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Diagnóstico</p>
                <p className="text-base leading-relaxed">{data.diagnostico}</p>
              </div>

               <Separator />
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Codigos</p>
                <p className="text-base leading-relaxed">{data.codigo}</p>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Tratamiento realizado</p>
                <p className="text-base leading-relaxed">{data.tratamiento}</p>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Observaciones / Notas</p>
                <p className="text-base leading-relaxed">{data.observaciones}</p>
              </div>
            </CardContent>
          </Card>

          {/* Attachments Card */}
          {consultation.attachments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Paperclip className="size-5" />
                  Archivos adjuntos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {/* {consultation.attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center justify-between rounded-lg border bg-muted/30 p-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="rounded-md bg-primary/10 p-2">
                          <FileText className="size-4 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{attachment.name}</p>
                          <p className="text-xs text-muted-foreground">{attachment.size}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon-sm">
                        <Download className="size-4" />
                        <span className="sr-only">Download {attachment.name}</span>
                      </Button>
                    </div>
                  ))} */}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Metadata Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="size-5" />
                Registrar información
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="font-medium">{formatDateTime(data.created_at)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ultima Actualización</p>
                  <p className="font-medium">{formatDateTime(data.updated_at)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
              </>
            )
          }
        </div>
      </div>
    </>
  )
}
