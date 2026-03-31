import { TextField, Typography, Box, ThemeProvider } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { theme } from "@/theme";
import { ChildFormValues } from "@/components/AddChildProfile/AddChildTypes";

export default function HistoryForm() {
    const { control } = useFormContext<ChildFormValues>();

    return (
        <ThemeProvider theme={theme}>
            <Box className="flex flex-col gap-6">
                <Typography variant="h6" mb={1}>
                    Riwayat Kesehatan
                </Typography>

                <Box>
                    <p className="text-black text-xl font-semibold mb-4">Alergi</p>
                    <Controller
                        name="alergi"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                fullWidth
                                placeholder="Alergi"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "12px",
                                        backgroundColor: "primary.main",
                                    },
                                }}
                            />
                        )}
                    />
                </Box>

                <Box>
                    <p className="text-black text-xl font-semibold mb-4">Riwayat Penyakit</p>
                    <Controller
                        name="penyakit"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                fullWidth
                                placeholder="Riwayat penyakit"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "12px",
                                        backgroundColor: "primary.main",
                                    },
                                }}
                            />
                        )}
                    />
                </Box>
            </Box>
        </ThemeProvider>
    );
}