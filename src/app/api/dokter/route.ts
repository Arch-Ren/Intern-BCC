import { NextRequest, NextResponse } from "next/server"

const BASE_URL = process.env.API_BASE_URL

export async function GET(req: NextRequest) {
    try {
        if (!BASE_URL) {
            return NextResponse.json(
                { message: "API_BASE_URL belum diset" },
                { status: 500 }
            )
        }

        const authorization = req.headers.get("authorization")

        if (!authorization) {
            return NextResponse.json(
                { message: "Authorization header tidak ada" },
                { status: 401 }
            )
        }

        const res = await fetch(`${BASE_URL}/dokter`, {
            method: "GET",
            headers: {
                Authorization: authorization,
                Accept: "application/json",
            },
            cache: "no-store",
        })

        const text = await res.text()

        let data: unknown
        try {
            data = JSON.parse(text)
        } catch {
            data = text
        }

        return NextResponse.json(data, { status: res.status })
    } catch (error) {
        return NextResponse.json(
            {
                message: "Proxy Next.js gagal request ke backend",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        )
    }
}