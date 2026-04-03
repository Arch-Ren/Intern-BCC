export type UserRole = "parent" | "admin" | "doctor"
export type AuthProvider = "credentials" | "google"

export type LoginResponse = {
    user?: {
        name?: string
        email?: string
        photo?: string
    }
    token: string
    message?: string
}

export type RegisterPayload = {
    nama: string
    username: string
    email: string
    password: string
    confirm_password: string
}

export type RegisterResponse = {
    message: string
}