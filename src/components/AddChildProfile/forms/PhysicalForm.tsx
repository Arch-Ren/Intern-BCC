import { TextField, Typography, Box, ThemeProvider } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { theme } from "@/theme";
import { ChildFormValues } from "@/components/AddChildProfile/AddChildTypes";

export default function PhysicalForm() {
    const { control } = useFormContext<ChildFormValues>();

    return (
        <ThemeProvider theme={theme}>
            <Box className="flex flex-col gap-6">
                <Typography variant="h6" mb={1}>
                    Data Fisik Anak
                </Typography>

                <Box className="grid grid-cols-2 gap-6">
                    <Box>
                        <Typography className="text-black text-lg mb-2">
                            Tinggi Badan
                        </Typography>
                        <Controller
                            name="tinggi"
                            control={control}
                            rules={{ required: "Tinggi wajib diisi" }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    placeholder="... cm"
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
                        <Typography className="text-black text-lg mb-2">
                            Berat Badan
                        </Typography>
                        <Controller
                            name="berat"
                            control={control}
                            rules={{ required: "Berat wajib diisi" }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    placeholder="... kg"
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
                        <Typography className="text-black text-lg mb-2">
                            Lingkar Kepala
                        </Typography>
                        <Controller
                            name="lingkarKepala"
                            control={control}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    placeholder="... cm"
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
                        <Typography className="text-black text-lg mb-2">
                            LiLA (Lingkar Lengan Atas)
                        </Typography>
                        <Controller
                            name="lila"
                            control={control}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    placeholder="... cm"
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

                <Box>
                    <Typography className="text-black text-lg mb-2">
                        Golongan Darah
                    </Typography>
                    <Controller
                        name="golDarah"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                fullWidth
                                placeholder="O"
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