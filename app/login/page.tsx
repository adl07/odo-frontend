"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Stethoscope } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldGroup, FieldError } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { login, setToken, setTokenDoctor, setDoctorName } from "@/lib/auth"
import { LoginSchema } from "../schema/login.schema"
export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [apiError, setApiError] = useState<string | null>(null)

  const validateUser = (username: string): boolean => {
    const usernameValidate = LoginSchema.safeParse(username);
    return usernameValidate.success
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})
    setApiError(null)

    const formData = new FormData(e.currentTarget)
    const username = (formData.get("username") as string).trim()
    const password = formData.get("password") as string

    // Validation
    const newErrors: Record<string, string> = {}

    if (!username) {
      newErrors.username = "username is required"
    } else if (!validateUser(username)) {
      newErrors.username = "Please enter a valid username"
    }

    if (!password) {
      newErrors.password = "Password is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    try {
      const response = await login({ username, password })
      console.log(response)
      setToken(response.access_token)
      setTokenDoctor(response.doctorId)
      setDoctorName(response.doctorname)
      router.push("/")
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Stethoscope className="size-7" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">ODI-Dental</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sistema de Gestión de Consultas</p>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Bienvenida/o</CardTitle>
            <CardDescription>Inicie sesión en su cuenta para continuar</CardDescription>
          </CardHeader>
          <CardContent>
            {apiError && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{apiError}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field data-invalid={!!errors.username}>
                  <FieldLabel htmlFor="email">Usuario</FieldLabel>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="nombre"
                    autoComplete="nombre"
                    autoFocus
                    aria-invalid={!!errors.username}
                  />
                  {errors.username && <FieldError>{errors.username}</FieldError>}
                </Field>

                <Field data-invalid={!!errors.password}>
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="contraseña"
                      autoComplete="current-password"
                      aria-invalid={!!errors.password}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="absolute right-1 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide" : "Show"} password
                      </span>
                    </Button>
                  </div>
                  {errors.password && <FieldError>{errors.password}</FieldError>}
                </Field>
              </FieldGroup>

              <Button type="submit" className="mt-6 w-full" disabled={isLoading}>
                {isLoading && <Spinner className="mr-2" />}
                {isLoading ? "Ingresando..." : "Ingresar"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              {"Don't have an account? "}
              <Link
                href="/register"
                className="font-medium text-primary hover:underline"
              >
                Create one
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
