import { NextRequest, NextResponse } from "next/server"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function POST(req: NextRequest) {
    try {
        if (!BASE_URL) {
            return NextResponse.json(
                { message: "Base URL API belum diset" },
                { status: 500 }
            )
        }

        const body = await req.json()

        console.log("LOGIN TARGET:", `${BASE_URL}/api/v1/auth/login`)
        console.log("LOGIN BODY:", body)

        const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })

        const text = await res.text()
        console.log("LOGIN STATUS:", res.status)
        console.log("LOGIN RESPONSE:", text)

        let data: any
        try {
            data = JSON.parse(text)
        } catch {
            data = { message: text || "Response backend bukan JSON" }
        }

        return NextResponse.json(data, { status: res.status })
    } catch (error) {
        console.error("LOGIN ROUTE ERROR:", error)

        return NextResponse.json(
            { message: "Gagal menghubungi backend" },
            { status: 500 }
        )
    }
}