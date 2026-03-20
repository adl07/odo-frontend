const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""

export interface LoginCredentials {
  username: string
  password: string
}

export interface RegisterData {
  fullName: string
  email: string
  password: string
}

export interface AuthResponse {
  access_token: string
  doctorId: string
  doctorname: string
}

export interface AuthError {
  message: string
  statusCode: number
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })

  
  if (!response.ok) {
    const error: AuthError = await response.json()
    throw new Error(error.message || "Invalid email or password")
  }

  const data = await response.json();
  return data
}

export async function register(data: RegisterData): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error: AuthError = await response.json()
    throw new Error(error.message || "Registration failed")
  }

  return response.json()
}

export function setToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_token", token)
  }
}

export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token")
  }
  return null
}

export function removeToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token")
  }
}

export function isAuthenticated(): boolean {
  return !!getToken()
}

export function setDoctorId(id: string){
  if( typeof window !== "undefined"){
    localStorage.setItem("doctor_id", id)
  }
}

export function setDoctorName(doctorname: string){
  if( typeof window !== "undefined"){
    localStorage.setItem("doctor_name", doctorname)
  }
}