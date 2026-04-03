import { NextRequest, NextResponse } from "next/server"

const BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_URL

export async function GET(req: NextRequest) {
    try {
        if (!BASE_URL) {
            return NextResponse.json(
                { message: "Base URL API belum diset" },
                { status: 500 }
            )
        }

        const authHeader = req.headers.get("authorization")

        const res = await fetch(`${BASE_URL}/anak`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(authHeader ? { Authorization: authHeader } : {}),
            },
            cache: "no-store",
        })

        const text = await res.text()

        let data: any
        try {
            data = JSON.parse(text)
        } catch {
            data = { message: text || "Response backend bukan JSON" }
        }

        return NextResponse.json(data, { status: res.status })
    } catch (error) {
        console.error("GET /api/user/children error:", error)

        return NextResponse.json(
            { message: "Gagal menghubungi backend" },
            { status: 500 }
        )
    }
}

export async function POST(req: NextRequest) {
    try {
        if (!BASE_URL) {
            return NextResponse.json(
                { message: "Base URL API belum diset" },
                { status: 500 }
            )
        }

        const authorization = req.headers.get("authorization")
        const body = await req.json()

        const res = await fetch(`${BASE_URL}/anak`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(authorization ? { Authorization: authorization } : {}),
            },
            body: JSON.stringify(body),
        })

        const text = await res.text()

        let data: any
        try {
            data = JSON.parse(text)
        } catch {
            data = {
                message: text || "Response backend bukan JSON",
            }
        }

        return NextResponse.json(data, { status: res.status })
    } catch (error) {
        console.error("POST /api/user/children error:", error)

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}