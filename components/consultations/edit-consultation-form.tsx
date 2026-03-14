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
  id: string,
  nombre: string,
  dni: string,
  date: string,
  reason: string,
  diagnosis?: string ,
  treatment?: string,
  observations?: string
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
      nombre: formData.get("nombre") as string,
      dni: formData.get("dni") as string,
      date: formData.get("date") as string,
      reason: formData.get("reason") as string,
      diagnosis: formData.get("diagnosis") as string,
      treatment: formData.get("treatment") as string,
      observations: formData.get("observations") as string,
    }

    // Basic validation
    const newErrors: Record<string, string> = {}
    if (!data.nombre) newErrors.nombre = "Paciente name is required"
    if (!data.dni) newErrors.dni = "DNI is required"
    if (!data.date) newErrors.date = "Date is required"
    if (!data.reason) newErrors.reason = "Reason is required"

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
      <Card>
        <CardHeader>
          <CardTitle>Paciente Information</CardTitle>
          <CardDescription>Edit the patient details for this consultation</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field data-invalid={!!errors.nombre}>
                <FieldLabel htmlFor="nombre">Paciente Name *</FieldLabel>
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
                <FieldLabel htmlFor="dni">National ID / DNI *</FieldLabel>
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
              <FieldLabel htmlFor="date">Consultation Date *</FieldLabel>
              <Input
                id="date"
                name="date"
                type="date"
                defaultValue={dataConsultation.date}
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
          <CardDescription>Edit the consultation details and findings</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field data-invalid={!!errors.reason}>
              <FieldLabel htmlFor="reason">Reason for Consultation *</FieldLabel>
              <Input
                id="reason"
                name="reason"
                placeholder="e.g., Routine checkup, Tooth pain, Cleaning"
                defaultValue={dataConsultation.reason}
                aria-invalid={!!errors.reason}
              />
              {errors.reason && <FieldError>{errors.reason}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="diagnosis">Diagnosis</FieldLabel>
              <Textarea
                id="diagnosis"
                name="diagnosis"
                placeholder="Enter the diagnosis based on examination findings"
                defaultValue={dataConsultation.diagnosis}
                className="min-h-24"
              />
              <FieldDescription>
                Describe the clinical findings and diagnosis
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="treatment">Treatment Performed</FieldLabel>
              <Textarea
                id="treatment"
                name="treatment"
                placeholder="Describe the treatment or procedure performed"
                defaultValue={dataConsultation.treatment}
                className="min-h-24"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="observations">Observations / Notes</FieldLabel>
              <Textarea
                id="observations"
                name="observations"
                placeholder="Additional notes, follow-up instructions, or recommendations"
                defaultValue={dataConsultation.observations}
                className="min-h-24"
              />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Attachments</CardTitle>
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
                      <span className="sr-only">Remove file</span>
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 transition-colors hover:border-muted-foreground/50">
              <Upload className="mb-3 size-10 text-muted-foreground" />
              <p className="mb-1 text-sm font-medium">Add more files</p>
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
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Spinner className="mr-2" />}
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  )
}
