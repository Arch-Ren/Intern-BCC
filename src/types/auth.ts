export type UserRole = "parent" | "admin" | "doctor"

export type UserAccount = {
    id: string
    email: string
    role: UserRole
    provider: "credentials" | "google"
    isVerified: boolean
    createdAt: string
    updatedAt: string
}