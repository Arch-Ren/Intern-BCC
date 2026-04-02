import { NextRequest, NextResponse } from "next/server"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function GET(req: NextRequest) {
    try {
        const token = req.headers.get("authorization")

        const res = await fetch(`${BASE_URL}/makanan`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: token }),
            },
        })

        const data = await res.json()

        return NextResponse.json(data, { status: res.status })
    } catch (error) {
        return NextResponse.json(
            { message: "Gagal fetch makanan" },
            { status: 500 }
        )
    }
}