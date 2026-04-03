"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailOutline } from "@mui/icons-material";
import {
    Alert,
    Box,
    Button,
    FormHelperText,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import Link from "next/link";
import { postForgotPassword } from "@/lib/api/auth";
import {
    forgotPasswordSchema,
    ForgotPasswordFormValues,
} from "@/lib/validations/forgotPasswordSchema";

export default function ForgotPasswordForm() {
    const [apiMessage, setApiMessage] = useState("");
    const [apiError, setApiError] = useState("");

    const {
        control,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (data: ForgotPasswordFormValues) => {
        try {
            setApiMessage("");
            setApiError("");

            const result = await postForgotPassword(data.email);
            setApiMessage(result.message || "Jika email terdaftar, link reset akan dikirimkan");
            reset();
        } catch (error) {
            setApiError(error instanceof Error ? error.message : "Gagal mengirim email reset password");
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                    <Box mb={2}>
                        <TextField
                            {...field}
                            fullWidth
                            size="small"
                            label="Email"
                            placeholder="youremail@gmail.com"
                            error={!!fieldState.error}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MailOutline fontSize="small" />
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
                disabled={isSubmitting}
                sx={{
                    py: 1.2,
                    textTransform: "none",
                    borderRadius: 2,
                    backgroundColor: "#49c5aa",
                    boxShadow: "none",
                    '&:hover': { backgroundColor: "#32b196", boxShadow: "none" },
                }}
            >
                {isSubmitting ? "Loading..." : "Send Reset Link"}
            </Button>

            <Typography variant="body2" color="text.secondary" mt={2}>
                Don&apos;t have an account?{' '}
                <Link href="/register" style={{ color: "#1ca58d", textDecoration: "none", fontWeight: 500 }}>
                    Sign Up
                </Link>
            </Typography>
        </Box>
    );
}
