import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const token = body?.token;

        if (!token) {
            return NextResponse.json({ message: "Token wajib ada" }, { status: 400 });
        }

        const response = await fetch(
            `${process.env.API_BASE_URL}/auth/reset-password?token=${encodeURIComponent(token)}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
                cache: "no-store",
            }
        );

        const result = await response.json().catch(() => ({}));

        return NextResponse.json(result, { status: response.status });
    } catch (error) {
        return NextResponse.json(
            {
                message: error instanceof Error ? error.message : "Proxy reset password gagal",
            },
            { status: 500 }
        );
    }
}
