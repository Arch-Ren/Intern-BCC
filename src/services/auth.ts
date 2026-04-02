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

export async function loginService(
    email: string,
    password: string
): Promise<LoginResponse> {
    if (!email || !password) {
        throw new Error("Email dan password wajib diisi")
    }

    const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || "Login gagal")
    }

    return data
}

export async function registerService(
    payload: RegisterPayload
): Promise<RegisterResponse> {
    const { nama, username, email, password, confirm_password } = payload

    if (!nama || !username || !email || !password || !confirm_password) {
        throw new Error("Semua field wajib diisi")
    }

    const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nama,
            username,
            email,
            password,
            confirm_password,
        }),
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || "Register gagal")
    }

    return data
}

export function loginWithGoogleService() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL

    if (!baseUrl) {
        throw new Error("Base URL API belum diset")
    }

    window.location.href = `${baseUrl}/api/v1/auth/google`
}

export function registerWithGoogleService() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL

    if (!baseUrl) {
        throw new Error("Base URL API belum diset")
    }

    window.location.href = `${baseUrl}/api/v1/auth/google`
}