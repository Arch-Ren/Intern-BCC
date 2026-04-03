import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const response = await fetch(`${process.env.API_BASE_URL}/auth/forgot-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            cache: "no-store",
        });

        const result = await response.json().catch(() => ({}));

        return NextResponse.json(result, { status: response.status });
    } catch (error) {
        return NextResponse.json(
            {
                message: error instanceof Error ? error.message : "Proxy forgot password gagal",
            },
            { status: 500 }
        );
    }
}
