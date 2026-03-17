"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, X, FileText, Image as ImageIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel, FieldGroup, FieldDescription, FieldError } from "@/components/ui/field"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { useCreatePatients } from "@/hooks/createPatient"

interface AttachedFile {
  id: string
  name: string
  type: "image" | "document"
  size: string
}

export function ConsultationForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  const {mutateAsync, data, isPending, error} = useCreatePatients()


  const doctorId = localStorage.getItem('doctor_id')
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newFiles: AttachedFile[] = Array.from(files).map((file, index) => ({
      id: `${Date.now()}-${index}`,
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

      nombre: formData.get("nombre") as string,
      dni: formData.get("dni") as string,
      date: formData.get("date") as string,
      motivo: formData.get("motivo") as string,
      diagnostico: formData.get("diagnosis") as string,
      tratamiento: formData.get("treatment") as string,
      observaciones: formData.get("observations") as string,
      doctorid: doctorId as string

      
    }

    console.log(data)

    // Basic validation
    const newErrors: Record<string, string> = {}
    if (!data.nombre) newErrors.nombre = "El nombre del paciente es requerido"
    if (!data.dni) newErrors.dni = "DNI es requerido"
    if (!data.date) newErrors.date = "Fecha es requerido"
    if (!data.motivo) newErrors.motivo = "Motivo de consulta es requerido"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }
    
    try {
      console.log('data', data)
      await mutateAsync(data)
      router.push("/consultations")

    } catch (error) {
      console.error("Error creando paciente", error)
    } finally{
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Información del Paciente</CardTitle>
          <CardDescription>Ingrese los datos del paciente para esta consulta</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field data-invalid={!!errors.nombre}>
                <FieldLabel htmlFor="nombre">Nombre del paciente *</FieldLabel>
                <Input
                  id="nombre"
                  name="nombre"
                  placeholder="Ingrese el nombre del paciente"
                  aria-invalid={!!errors.nombre}
                />
                {errors.nombre && <FieldError>{errors.nombre}</FieldError>}
              </Field>

              <Field data-invalid={!!errors.dni}>
                <FieldLabel htmlFor="dni">DNI *</FieldLabel>
                <Input
                  id="dni"
                  name="dni"
                  placeholder="12345678A"
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
                defaultValue={new Date().toISOString().split("T")[0]}
                aria-invalid={!!errors.date}
              />
              {errors.date && <FieldError>{errors.date}</FieldError>}
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Clinical Information</CardTitle>
          <CardDescription>Descripción de la consulta *</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field data-invalid={!!errors.motivo}>
              <FieldLabel htmlFor="reason">Motivo de la Consulta *</FieldLabel>
              <Input
                id="motivo"
                name="motivo"
                placeholder="por ejemplo, chequeo de rutina, dolor de muelas, limpieza"
                aria-invalid={!!errors.motivo}
              />
              {errors.motivo && <FieldError>{errors.motivo}</FieldError>}
            </Field>

            <Field data-invalid={!!errors.codigo}>
              <FieldLabel htmlFor="reason">Codigos</FieldLabel>
              <Input
                id="codigo"
                name="codigo"
                placeholder="por ejemplo, 000112"
                aria-invalid={!!errors.codigo}
              />
              {errors.codigo && <FieldError>{errors.codigo}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="diagnosis">Diagnostico</FieldLabel>
              <Textarea
                id="diagnosis"
                name="diagnosis"
                placeholder="Ingrese el diagnóstico basado en los hallazgos del examen"
                className="min-h-24"
              />
              <FieldDescription>
                Describir los hallazgos clínicos y el diagnóstico
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="treatment">Tratamiento Realizado</FieldLabel>
              <Textarea
                id="treatment"
                name="treatment"
                placeholder="Describir el tratamiento o procedimiento realizado"
                className="min-h-24"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="observations">Observaciones</FieldLabel>
              <Textarea
                id="observations"
                name="observations"
                placeholder="Notas adicionales, instrucciones de seguimiento o recomendaciones"
                className="min-h-24"
              />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Adjuntos</CardTitle>
          <CardDescription>Sube radiografías, fotografías u otros documentos relevantes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 transition-colors hover:border-muted-foreground/50">
              <Upload className="mb-3 size-10 text-muted-foreground" />
              <p className="mb-1 text-sm font-medium">Elimine archivos aquí o haga clic para cargarlos</p>
              <p className="text-xs text-muted-foreground">
                Soporta imagenes (JPG, PNG) y documentos (PDF)
              </p>
              <Input
                type="file"
                multiple
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="mt-4 w-auto"
              />
            </div>

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
                        <p className="text-xs text-muted-foreground">{file.size}</p>
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
          {isSubmitting ? "Guardando..." : "Guardar Consulta"}
        </Button>
      </div>
    </form>
  )
}
