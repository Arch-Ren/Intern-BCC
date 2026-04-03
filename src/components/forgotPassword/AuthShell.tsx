"use client";

import { ReactNode } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

type AuthShellProps = {
    pageTitle: string;
    cardTitle: string;
    children: ReactNode;
};

export default function AuthShell({ pageTitle, cardTitle, children }: AuthShellProps) {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100%",
                bgcolor: "#035f4b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
                py: 4,
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 1200,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Typography sx={{ mb: 5, fontSize: { xs: 32, md: 40 }, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>
                    {pageTitle}
                </Typography>

                <Box display="flex" justifyContent="center">
                    <Card
                        elevation={0}
                        sx={{
                            width: "100%",
                            maxWidth: 480,
                            borderRadius: 3,
                            boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
                        }}
                    >
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h5" fontWeight={700} mb={3}>
                                {cardTitle}
                            </Typography>
                            {children}
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Box>
    );
}
