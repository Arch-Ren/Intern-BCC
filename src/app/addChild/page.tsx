"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import { Box, Button, Paper } from "@mui/material"

import { ChildFormValues } from "@/components/AddChildProfile/AddChildTypes"
import StepSidebar from "@/components/AddChildProfile/StepSidebar"
import BiodataForm from "@/components/AddChildProfile/forms/BiodataForm"
import PhysicalForm from "@/components/AddChildProfile/forms/PhysicalForm"
import HistoryForm from "@/components/AddChildProfile/forms/HistoryForm"
import ProfileForm from "@/components/AddChildProfile/forms/ProfileForm"
import { useChildrenStore } from "@/stores/children"

const steps = [
    "Biodata Anak",
    "Data Fisik Anak",
    "Riwayat Kesehatan",
    "Personalisasi Profil",
]

export default function ChildProfilePage() {
    const [activeStep, setActiveStep] = useState(0)
    const router = useRouter()

    const addChild = useChildrenStore((state) => state.addChild)
    const isSubmitting = useChildrenStore((state) => state.isSubmitting)
    const error = useChildrenStore((state) => state.error)

    const methods = useForm<ChildFormValues>({
        defaultValues: {
            nama: "",
            tanggal: "",
            bulan: "",
            tahun: "",
            jenisKelamin: "",
            anakKe: "",
            tinggi: "",
            berat: "",
            lingkarKepala: "",
            lila: "",
            golDarah: "",
            alergi: "",
            penyakit: "",
            foto: null,
        },
        mode: "onChange",
    })

    const { handleSubmit, trigger } = methods

    const stepFields: (keyof ChildFormValues)[][] = [
        ["nama", "tanggal", "bulan", "tahun", "jenisKelamin", "anakKe"],
        ["tinggi", "berat", "lingkarKepala", "lila"],
        ["golDarah", "alergi", "penyakit"],
        ["foto"],
    ]

    const handleNext = async () => {
        const valid = await trigger(stepFields[activeStep])
        if (!valid) return

        if (activeStep < steps.length - 1) {
            setActiveStep((prev) => prev + 1)
        }
    }

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep((prev) => prev - 1)
        }
    }

    const handleClose = () => {
        router.push("/dashboard/profile")
    }

    const onSubmit: SubmitHandler<ChildFormValues> = async (data) => {
        if (activeStep !== steps.length - 1) return

        try {
            const tanggal = Number(data.tanggal)
            const bulan = Number(data.bulan)
            const tahun = Number(data.tahun)
            const tinggi = Number(data.tinggi)
            const berat_badan = Number(data.berat)
            const anak_ke = Number(data.anakKe)
            const lingkar_kepala = data.lingkarKepala ? Number(data.lingkarKepala) : 0
            const lingkar_lengan = data.lila ? Number(data.lila) : 0

            if (!tanggal || !bulan || !tahun) {
                throw new Error("Tanggal lahir tidak valid")
            }

            if (!tinggi || !berat_badan || !anak_ke) {
                throw new Error("Data angka belum valid")
            }

            const tanggal_lahir = `${tahun}-${String(bulan).padStart(2, "0")}-${String(tanggal).padStart(2, "0")}`

            const payload = {
                nama: data.nama.trim(),
                tanggal_lahir,
                tinggi,
                berat_badan,
                gender: data.jenisKelamin === "Laki-laki" ? "laki-laki" : "perempuan",
                anak_ke,
                lingkar_kepala,
                lingkar_lengan,
                golongan_darah: data.golDarah,
                alergi: data.alergi || "tidak ada",
                riwayat_penyakit: data.penyakit || "tidak ada",
            }

            console.log("PAYLOAD FINAL:", payload)

            await addChild(payload)

            alert("Data berhasil disubmit")
            router.push("/dashboard/profile")
        } catch (err) {
            console.error("SUBMIT ERROR:", err)

            if (err instanceof Error) {
                alert(err.message)
            } else {
                alert("Gagal kirim data")
            }
        }

    }

    const renderStepForm = () => {
        switch (activeStep) {
            case 0:
                return <BiodataForm />
            case 1:
                return <PhysicalForm />
            case 2:
                return <HistoryForm />
            case 3:
                return <ProfileForm />
            default:
                return null
        }
    }

    return (
        <FormProvider {...methods}>
            <Box
                sx={{
                    display: "flex",
                    minHeight: "100vh",
                    bgcolor: "#f5f5f5",
                    px: 12,
                    py: 4,
                    gap: 3,
                }}
            >
                <StepSidebar steps={steps} activeStep={activeStep} />

                <Paper
                    elevation={0}
                    sx={{
                        flex: 1,
                        p: 4,
                        borderRadius: "20px",
                        position: "relative",
                        minHeight: "85vh",
                    }}
                >
                    <button
                        className="absolute top-8 right-8 rounded-full px-2 font-bold text-primary hover:bg-black/20"
                        onClick={handleClose}
                        type="button"
                    >
                        X
                    </button>

                    {renderStepForm()}

                    {error && (
                        <p className="mt-4 text-sm text-red-500">
                            {error}
                        </p>
                    )}

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: activeStep === 0 ? "flex-end" : "space-between",
                            mt: 6,
                        }}
                    >
                        {activeStep !== 0 && (
                            <Button
                                type="button"
                                variant="outlined"
                                onClick={handleBack}
                                sx={{
                                    minWidth: 110,
                                    borderRadius: "12px",
                                    textTransform: "none",
                                    borderColor: "#D3D3D3",
                                    color: "#8A8A8A",
                                    backgroundColor: "#D9D9D9",
                                }}
                            >
                                Kembali
                            </Button>
                        )}

                        {activeStep === steps.length - 1 ? (
                            <Button
                                type="button"
                                variant="contained"
                                onClick={handleSubmit(onSubmit)}
                                disabled={isSubmitting}
                                sx={{
                                    minWidth: 140,
                                    borderRadius: "12px",
                                    textTransform: "none",
                                    backgroundColor: "#173A63",
                                }}
                            >
                                {isSubmitting ? "Menyimpan..." : "Selesai"}
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                variant="contained"
                                onClick={handleNext}
                                sx={{
                                    minWidth: 140,
                                    borderRadius: "12px",
                                    textTransform: "none",
                                    backgroundColor: "#173A63",
                                }}
                            >
                                Selanjutnya
                            </Button>
                        )}
                    </Box>
                </Paper>
            </Box>
        </FormProvider>
    )
}