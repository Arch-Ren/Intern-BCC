'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Box, Button, Paper, IconButton } from "@mui/material";

import { ChildFormValues } from "@/components/AddChildProfile/AddChildTypes";
import StepSidebar from "@/components/AddChildProfile/StepSidebar";
import BiodataForm from "@/components/AddChildProfile/forms/BiodataForm";
import PhysicalForm from "@/components/AddChildProfile/forms/PhysicalForm";
import HistoryForm from "@/components/AddChildProfile/forms/HistoryForm";
import ProfileForm from "@/components/AddChildProfile/forms/ProfileForm";

const steps = [
    "Biodata Anak",
    "Data Fisik Anak",
    "Riwayat Kesehatan",
    "Personalisasi Profil",
];

export default function ChildProfilePage() {
    const [activeStep, setActiveStep] = useState(0);
    const router = useRouter();

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
    });

    const { handleSubmit, trigger } = methods;

    const stepFields: (keyof ChildFormValues)[][] = [
        ["nama", "tanggal", "bulan", "tahun", "jenisKelamin", "anakKe"],
        ["tinggi", "berat", "lingkarKepala", "lila"],
        ["alergi", "penyakit"],
        ["foto"],
    ];

    const handleNext = async () => {
        const valid = await trigger(stepFields[activeStep]);

        if (!valid) return;

        if (activeStep < steps.length - 1) {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep((prev) => prev - 1);
        }
    };

    const handleClose = () => {
        router.push("/dashboard");
    };

    const onSubmit: SubmitHandler<ChildFormValues> = (data) => {
        if (activeStep !== steps.length - 1) return;

        console.log("FINAL DATA:", data);
        alert("Data berhasil disubmit");

        router.push("/dashboard");
    };

    const renderStepForm = () => {
        switch (activeStep) {
            case 0:
                return <BiodataForm />;
            case 1:
                return <PhysicalForm />;
            case 2:
                return <HistoryForm />;
            case 3:
                return <ProfileForm />;
            default:
                return null;
        }
    };

    return (
        <FormProvider {...methods}>
            <Box
                sx={{
                    display: "flex",
                    minHeight: "100vh",
                    bgcolor: "#f5f5f5",
                    px: 12, py: 4,
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
                    <button className="absolute top-8 right-8 text-primary font-bold hover:bg-black/20 px-2 rounded-full" onClick={handleClose}
                    >
                        X
                    </button>

                    {renderStepForm()}

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
                                sx={{
                                    minWidth: 140,
                                    borderRadius: "12px",
                                    textTransform: "none",
                                    backgroundColor: "#173A63",
                                }}
                            >
                                Selesai
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
    );
}