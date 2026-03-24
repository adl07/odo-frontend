"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, X, FileText, Image as ImageIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel, FieldGroup, FieldDescription, FieldError } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { useUpdateConsultId } from "@/hooks/updateConsultId"

interface AttachedFile {
  id: string
  name: string
  type: "image" | "document"
  size: string
  isExisting?: boolean
}

// This would typically be fetched from a database
export interface existingConsultation {
  doctorid: string
  id: string,
  nombre: string,
  dni: string,
  fecha: string,
  motivo: string,
  diagnostico?: string ,
  codigo?: string,
  tratamiento?: string,
  observaciones?: string
  attachments?: [] | [],
}


interface EditConsultationFormProps {
  consultationId: string,
  dataConsultation: existingConsultation
}

export function EditConsultationForm({ consultationId, dataConsultation }: EditConsultationFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  const {mutateAsync, data, isPending, error} = useUpdateConsultId()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newFiles: AttachedFile[] = Array.from(files).map((file, index) => ({
      id: `new-${Date.now()}-${index}`,
      name: file.name,
      type: file.type.startsWith("image/") ? "image" : "document",
      size: formatFileSize(file.size),
    }))

    setAttachedFiles((prev) => [...prev, ...newFiles])
    e.target.value = ""
  }

  const removeFile = (id: string) => {
    setAttachedFiles((prev) => prev.filter((file) => file.id !== id))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    const formData = new FormData(e.currentTarget)
    const data = {
      doctorid: dataConsultation.doctorid as string,
      nombre: formData.get("nombre") as string,
      dni: formData.get("dni") as string,
      fecha: formData.get("date") as string,
      motivo: formData.get("motivo") as string,
      codigo: formData.get("codigo") as string,
      diagnostico: formData.get("diagnostico") as string,
      tratamiento: formData.get("tratamiento") as string,
      observaciones: formData.get("observaciones") as string,
    }

    // Basic validation
    const newErrors: Record<string, string> = {}
    if (!data.nombre) newErrors.nombre = "Nombre del paciente es requerido"
    if (!data.dni) newErrors.dni = "DNI is required"
    if (!data.fecha) newErrors.date = "Date is required"
    if (!data.motivo) newErrors.motivo = "Motivo is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }
    
    
    try {
      await mutateAsync({id: consultationId, data: data})
      setIsSubmitting(false)
      router.push(`/consultations/${consultationId}`)

    } catch (error) {
      console.error("Error al modificar la consulta", error)
    } finally{
      setIsSubmitting(false)
    }
    

  }

  return (
    <form onSubmit={handleSubmit}>
      {
        dataConsultation && (
          <>
            <Card>
        <CardHeader>
          <CardTitle>Información del Paciente</CardTitle>
          <CardDescription>Edite los detalles del paciente para esta consulta</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field data-invalid={!!errors.nombre}>
                <FieldLabel htmlFor="nombre">Nombre *</FieldLabel>
                <Input
                  id="nombre"
                  name="nombre"
                  placeholder="Enter patient's full name"
                  defaultValue={dataConsultation.nombre}
                  aria-invalid={!!errors.nombre}
                />
                {errors.nombre && <FieldError>{errors.nombre}</FieldError>}
              </Field>

              <Field data-invalid={!!errors.dni}>
                <FieldLabel htmlFor="dni">DNI *</FieldLabel>
                <Input
                  id="dni"
                  name="dni"
                  placeholder="e.g., 12345678A"
                  defaultValue={dataConsultation.dni}
                  aria-invalid={!!errors.dni}
                />
                {errors.dni && <FieldError>{errors.dni}</FieldError>}
              </Field>
            </div>

            <Field data-invalid={!!errors.date}>
              <FieldLabel htmlFor="date">Fecha de Consulta *</FieldLabel>
              <Input
                id="date"
                name="date"
                type="date"
                defaultValue={dataConsultation.fecha?.split('T')[0]}
                aria-invalid={!!errors.date}
              />
              {errors.date && <FieldError>{errors.date}</FieldError>}
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Información Clínica</CardTitle>
          <CardDescription>Editar los detalles y hallazgos de la consulta</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field data-invalid={!!errors.reason}>
              <FieldLabel htmlFor="reason">Motivo de la Consulta</FieldLabel>
              <Input
                id="motivo"
                name="motivo"
                placeholder="por ejemplo, chequeo de rutina, dolor de muelas, limpieza"
                defaultValue={dataConsultation.motivo}
                aria-invalid={!!errors.motivo}
              />
              {errors.motivo && <FieldError>{errors.motivo}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="diagnostico">Diagnostico</FieldLabel>
              <Textarea
                id="diagnostico"
                name="diagnostico"
                placeholder="Ingrese al diagnóstico según los hallazgos del examen"
                defaultValue={dataConsultation.diagnostico}
                className="min-h-24"
              />
              <FieldDescription>
                Describir los hallazgos clínicos y diagnósticos
              </FieldDescription>
            </Field>

            <Field data-invalid={!!errors.codigo}>
              <FieldLabel htmlFor="reason">Codigos</FieldLabel>
              <Input
                id="codigo"
                name="codigo"
                placeholder="por ejemplo, 000112"
                aria-invalid={!!errors.codigo}
                defaultValue={dataConsultation.codigo}
              />
              {errors.codigo && <FieldError>{errors.codigo}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="tratamiento">Tratamiento realizado</FieldLabel>
              <Textarea
                id="tratamiento"
                name="tratamiento"
                placeholder="Describe the treatment or procedure performed"
                defaultValue={dataConsultation.tratamiento}
                className="min-h-24"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="observaciones">Observaciones / Notas</FieldLabel>
              <Textarea
                id="observaciones"
                name="observaciones"
                placeholder="Additional notes, follow-up instructions, or recommendations"
                defaultValue={dataConsultation.observaciones}
                className="min-h-24"
              />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Adjuntos</CardTitle>
          <CardDescription>Manage X-rays, photos, or other relevant documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {attachedFiles.length > 0 && (
              <div className="space-y-2">
                {attachedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between rounded-lg border bg-muted/30 p-3"
                  >
                    <div className="flex items-center gap-3">
                      {file.type === "image" ? (
                        <ImageIcon className="size-5 text-primary" />
                      ) : (
                        <FileText className="size-5 text-primary" />
                      )}
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {file.size}
                          {file.isExisting && " - Existing file"}
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="size-4" />
                      <span className="sr-only">Quitar Archivo</span>
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 transition-colors hover:border-muted-foreground/50">
              <Upload className="mb-3 size-10 text-muted-foreground" />
              <p className="mb-1 text-sm font-medium">Agregar Archivos</p>
              <p className="text-xs text-muted-foreground">
                Supports images (JPG, PNG) and documents (PDF)
              </p>
              <Input
                type="file"
                multiple
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="mt-4 w-auto"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Spinner className="mr-2" />}
          {isSubmitting ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </div>
          </>
        )
      }
    </form>
  )
}
