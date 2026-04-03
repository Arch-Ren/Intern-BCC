import { NextRequest, NextResponse } from "next/server"

const BASE_URL = (process.env.API_BASE_URL || "").replace(/\/$/, "")

export async function GET(req: NextRequest) {
    try {
        if (!BASE_URL) {
            return NextResponse.json(
                { message: "Base URL API belum diset" },
                { status: 500 }
            )
        }

        const authHeader = req.headers.get("authorization")

        console.log("PROFILE TARGET:", `${BASE_URL}/user/profile`)
        console.log("PROFILE AUTH HEADER:", authHeader)

        if (!authHeader) {
            return NextResponse.json(
                { message: "Token tidak ditemukan" },
                { status: 401 }
            )
        }

        const res = await fetch(`${BASE_URL}/user/profile`, {
            method: "GET",
            headers: {
                Authorization: authHeader,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        })

        const text = await res.text()

        console.log("PROFILE STATUS:", res.status)
        console.log("PROFILE RESPONSE:", text)

        let data: any
        try {
            data = JSON.parse(text)
        } catch {
            data = { message: text || "Response backend bukan JSON" }
        }

        return NextResponse.json(data, { status: res.status })
    } catch (error) {
        console.error("GET /api/user/profile error:", error)

        return NextResponse.json(
            { message: "Gagal menghubungi backend" },
            { status: 500 }
        )
    }
}