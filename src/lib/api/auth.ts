type ApiSuccess = {
    message: string;
    [key: string]: unknown;
};

async function fetcher<T>(url: string, options: RequestInit): Promise<T> {
    const response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(result?.message || "Terjadi kesalahan pada server");
    }

    return result;
}

export async function postForgotPassword(email: string) {
    return fetcher<ApiSuccess>("/api/auth/forgotPassword", {
        method: "POST",
        body: JSON.stringify({ email }),
    });
}

export async function postResetPassword(token: string, password: string) {
    return fetcher<ApiSuccess>("/api/auth/resetPassword", {
        method: "POST",
        body: JSON.stringify({ token, password }),
    });
}
