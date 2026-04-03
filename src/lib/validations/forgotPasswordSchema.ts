import { z } from "zod";

export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, "Email wajib diisi")
        .email("Format email tidak valid")
        .refine((value) => value.endsWith("@gmail.com"), {
            message: "Email harus menggunakan @gmail.com",
        }),
});

export const resetPasswordSchema = z
    .object({
        password: z.string().min(8, "Password minimal 8 karakter"),
        confirmPassword: z.string().min(8, "Konfirmasi password minimal 8 karakter"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Konfirmasi password tidak sama",
        path: ["confirmPassword"],
    });

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
