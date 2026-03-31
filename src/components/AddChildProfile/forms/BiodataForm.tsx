import { TextField, MenuItem, Typography, Box, ThemeProvider } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { theme } from "@/theme";

export default function BiodataForm() {
    const { control } = useFormContext();

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const years = Array.from({ length: 17 }, (_, i) => new Date().getFullYear() - i);

    return (
        <ThemeProvider theme={theme}>
            <Box className="flex flex-col gap-8">
                <Typography variant="h6" mb={3}>
                    Biodata Anak
                </Typography>

                <div>
                    <p className="text-lg text-black">Nama Lengkap</p>
                    <Controller
                        name="nama"
                        control={control}
                        rules={{ required: "Nama wajib diisi" }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Nama"
                                margin="normal"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                sx={{ backgroundColor: 'primary.main' }}
                            />
                        )}
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <p className="text-lg text-black">Tanggal Lahir</p>
                    <div className="flex gap-6">
                        <Controller
                            name="tanggal"
                            control={control}
                            rules={{ required: "Tanggal wajib dipilih" }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    select
                                    fullWidth
                                    label="Tanggal"
                                    value={field.value ?? ""}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    name={field.name}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "12px",
                                            backgroundColor: "primary.main",
                                        },
                                    }}
                                >
                                    <MenuItem value="" disabled>
                                        Tanggal
                                    </MenuItem>
                                    {days.map((day) => (
                                        <MenuItem key={day} value={day}>
                                            {day}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />

                        <Controller
                            name="bulan"
                            control={control}
                            rules={{ required: "Bulan wajib dipilih" }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    select
                                    fullWidth
                                    label="Bulan"
                                    value={field.value ?? ""}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    name={field.name}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "12px",
                                            backgroundColor: 'primary.main',
                                        },
                                    }}
                                >
                                    {months.map((month, index) => (
                                        <MenuItem key={month} value={index + 1}>
                                            {month}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />

                        <Controller
                            name="tahun"
                            control={control}
                            rules={{ required: "Tahun wajib dipilih" }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    select
                                    fullWidth
                                    label="Tahun"
                                    value={field.value ?? ""}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    name={field.name}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "12px",
                                            backgroundColor: 'primary.main',
                                        },
                                    }}
                                >
                                    {years.map((year) => (
                                        <MenuItem key={year} value={year}>
                                            {year}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <p className="text-black text-lg">Jenis Kelamin</p>
                    <Controller
                        name="jenisKelamin"
                        control={control}
                        rules={{ required: "Jenis kelamin wajib dipilih" }}
                        render={({ field, fieldState }) => {
                            const genderOptions = [
                                {
                                    label: "Laki-laki",
                                    icon: <img src="/images/face-male.png" alt="Laki-laki" width={20} />,
                                },
                                {
                                    label: "Perempuan",
                                    icon: <img src="/images/face-female.png" alt="Perempuan" width={20} />,
                                },
                            ];

                            return (
                                <>
                                    <Box display="flex" gap={2}>
                                        {genderOptions.map((item) => {
                                            const selected = field.value === item.label;

                                            return (
                                                <Box
                                                    key={item.label}
                                                    onClick={() => field.onChange(item.label)}
                                                    sx={{
                                                        flex: 1,
                                                        py: 2,
                                                        px: 2,
                                                        borderRadius: "12px",
                                                        border: "1px solid #6b9e95",
                                                        cursor: "pointer",
                                                        backgroundColor: "primary.main",
                                                        color: "#4a4a4a",
                                                        fontWeight: 500,
                                                        boxShadow: selected ? "inset 0 0 0 2px #0f7c8a" : "none",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        gap: 1,
                                                    }}
                                                >
                                                    {item.icon}
                                                    <span>{item.label}</span>
                                                </Box>
                                            );
                                        })}
                                    </Box>

                                    {fieldState.error && (
                                        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                            {fieldState.error.message}
                                        </Typography>
                                    )}
                                </>
                            );
                        }}
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <p className="text-black text-lg">Anak Ke</p>

                    <Controller
                        name="anakKe"
                        control={control}
                        rules={{ required: "Anak ke wajib dipilih" }}
                        render={({ field, fieldState }) => (
                            <TextField
                                select
                                fullWidth
                                label="Pilih"
                                value={field.value ?? ""}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                name={field.name}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "12px",
                                        backgroundColor: "primary.main",
                                    },
                                }}
                            >
                                <MenuItem value="" disabled>
                                    Pilih
                                </MenuItem>
                                {[1, 2, 3].map((item) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />
                </div>
            </Box>
        </ThemeProvider>
    );
}