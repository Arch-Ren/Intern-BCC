export type UserRole = "parent" | "admin" | "doctor"
export type AuthProvider = "credentials" | "google"

export type UserAccount = {
    id: string
    email: string
    role: UserRole
    provider: AuthProvider
    isVerified: boolean
    createdAt: string
    updatedAt: string
}