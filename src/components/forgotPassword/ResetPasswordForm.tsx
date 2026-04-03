"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockOutlined } from "@mui/icons-material";
import {
    Alert,
    Box,
    Button,
    FormHelperText,
    InputAdornment,
    TextField,
} from "@mui/material";
import { postResetPassword } from "@/lib/api/auth";
import {
    resetPasswordSchema,
    ResetPasswordFormValues,
} from "@/lib/validations/forgotPasswordSchema";

export default function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [apiError, setApiError] = useState("");
    const [apiMessage, setApiMessage] = useState("");

    const token = useMemo(() => searchParams.get("token") || "", [searchParams]);

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: ResetPasswordFormValues) => {
        try {
            setApiError("");
            setApiMessage("");

            if (!token) {
                throw new Error("Token reset password tidak ditemukan di URL");
            }

            const result = await postResetPassword(token, data.password);
            setApiMessage(result.message || "Password berhasil diubah");

            setTimeout(() => {
                router.push("/login");
            }, 1200);
        } catch (error) {
            setApiError(error instanceof Error ? error.message : "Gagal reset password");
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            {!token && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    Token reset password tidak ada. Buka ulang link dari email.
                </Alert>
            )}

            <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                    <Box mb={2}>
                        <TextField
                            {...field}
                            fullWidth
                            size="small"
                            type="password"
                            label="Enter New Password"
                            placeholder="••••••••"
                            error={!!fieldState.error}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOutlined fontSize="small" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {fieldState.error && <FormHelperText error>{fieldState.error.message}</FormHelperText>}
                    </Box>
                )}
            />

            <Controller
                name="confirmPassword"
                control={control}
                render={({ field, fieldState }) => (
                    <Box mb={2}>
                        <TextField
                            {...field}
                            fullWidth
                            size="small"
                            type="password"
                            label="Confirm Password"
                            placeholder="••••••••"
                            error={!!fieldState.error}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOutlined fontSize="small" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {fieldState.error && <FormHelperText error>{fieldState.error.message}</FormHelperText>}
                    </Box>
                )}
            />

            {apiError && <Alert severity="error" sx={{ mb: 2 }}>{apiError}</Alert>}
            {apiMessage && <Alert severity="success" sx={{ mb: 2 }}>{apiMessage}</Alert>}

            <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting || !token}
                sx={{
                    py: 1.2,
                    textTransform: "none",
                    borderRadius: 2,
                    backgroundColor: "#49c5aa",
                    boxShadow: "none",
                    '&:hover': { backgroundColor: "#32b196", boxShadow: "none" },
                }}
            >
                {isSubmitting ? "Loading..." : "Confirm Password"}
            </Button>
        </Box>
    );
}
