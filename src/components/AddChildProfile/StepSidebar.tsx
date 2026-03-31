import { Box, Typography } from "@mui/material";

type StepSideBarProps = {
    steps: string[];
    activeStep: number;
};

export default function StepSidebar({ steps, activeStep }: StepSideBarProps) {
    return (
        <Box
            sx={{
                width: 300,
                bgcolor: "#0E5F4D",
                color: "white",
                p: 3,
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                minHeight: "85vh",
            }}
        >
            <Box sx={{ mb: 4 }}>
                <img src="/images/geazy-logo-white.png" alt="logo-white" width={60} />
                <Typography sx={{ fontWeight: 700, fontSize: "1.5rem", lineHeight: 1.3 }}>
                    Buat Profil Anak
                </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 4, position: "relative" }}>
                {steps.map((label, index) => {
                    const isActive = index === activeStep;
                    const isCompleted = index < activeStep;
                    const isLast = index === steps.length - 1;

                    return (
                        <Box
                            key={label}
                            sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 2,
                                position: "relative",
                            }}
                        >
                            <Box
                                sx={{
                                    position: "relative",
                                    width: 24,
                                    display: "flex",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 22,
                                        height: 22,
                                        borderRadius: "50%",
                                        border: "2px solid white",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: isCompleted ? "white" : isActive ? "#43BA9C" : "#43BA9C",
                                        color: isCompleted ? "#0E5F4D" : "white",
                                        zIndex: 2,
                                    }}
                                >
                                    {isCompleted ? (<img src="/images/checklist.png" alt="check" />) : isActive ? (
                                        <Box
                                            sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: "50%",
                                                backgroundColor: "white",
                                            }}
                                        />
                                    ) : null}
                                </Box>

                                {!isLast && (
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 22,
                                            width: "2px",
                                            height: 42,
                                            backgroundColor: "rgba(255,255,255,0.85)",
                                            zIndex: 1,
                                        }}
                                    />
                                )}
                            </Box>

                            <Typography
                                sx={{
                                    fontSize: "1rem",
                                    fontWeight: isActive ? 700 : 500,
                                    color: "white",
                                    pt: "1px",
                                }}
                            >
                                {label}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
}