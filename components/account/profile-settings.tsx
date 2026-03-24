"use client"

import { useState } from "react"
import { Camera } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldGroup, FieldDescription } from "@/components/ui/field"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Spinner } from "@/components/ui/spinner"

export function ProfileSettings() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSaving(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your personal details and profile picture</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className="relative">
                <Avatar className="size-24">
                  <AvatarImage src="/placeholder-user.jpg" alt="Dr. Sarah Mitchell" />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">SM</AvatarFallback>
                </Avatar>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="absolute bottom-0 right-0 size-8 rounded-full"
                >
                  <Camera className="size-4" />
                  <span className="sr-only">Change profile picture</span>
                </Button>
              </div>
              <div className="text-center sm:text-left">
                <p className="font-medium">Dr. Sarah Mitchell</p>
                <p className="text-sm text-muted-foreground">General Dentist</p>
                <Button type="button" variant="outline" size="sm" className="mt-2">
                  Upload new photo
                </Button>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  defaultValue="Sarah"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                <Input
                  id="lastName"
                  name="lastName"
                  defaultValue="Mitchell"
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="email">Email Address</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue="sarah.mitchell@odidental.com"
              />
              <FieldDescription>
                This email is used for system notifications and account recovery
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
              <Input
                id="phone"
                name="phone"
                type="tel"
                defaultValue="+1 (555) 123-4567"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="specialty">Specialty</FieldLabel>
              <Input
                id="specialty"
                name="specialty"
                defaultValue="General Dentistry"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="license">License Number</FieldLabel>
              <Input
                id="license"
                name="license"
                defaultValue="DDS-123456"
              />
            </Field>
          </FieldGroup>

          <div className="mt-6 flex justify-end">
            <Button type="submit" disabled={isSaving}>
              {isSaving && <Spinner className="mr-2" />}
              {isSaving ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
