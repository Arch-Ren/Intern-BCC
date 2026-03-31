import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ChildFormValues } from "@/components/AddChildProfile/AddChildTypes";

export default function ProfileForm() {
    const { setValue, watch } = useFormContext<ChildFormValues>();
    const foto = watch("foto");
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!foto) {
            setPreviewUrl(null);
            return;
        }

        const objectUrl = URL.createObjectURL(foto);
        setPreviewUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [foto]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setValue("foto", file, { shouldValidate: true });
    };

    return (
        <Box className="flex flex-col min-h-[420px]">
            <Typography variant="h6" mb={4}>
                Personalisasi Profil
            </Typography>

            <Box className="flex flex-1 flex-col items-center justify-center">
                <Box className="flex flex-col items-center gap-3">
                    <Box
                        sx={{
                            width: 190,
                            height: 190,
                            borderRadius: "50%",
                            border: "1.5px solid #B8BEC7",
                            overflow: "hidden",
                            position: "relative",
                            bgcolor: "#F5F5F5",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {previewUrl ? (
                            <Image
                                src={previewUrl}
                                alt="Preview foto profil"
                                fill
                                unoptimized
                                style={{ objectFit: "cover" }}
                            />
                        ) : (
                            <Box
                                component="img"
                                src="/images/default-avatar.png"
                                alt="Default profile"
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        )}
                    </Box>

                    <Box
                        component="label"
                        htmlFor="foto-upload"
                        sx={{
                            cursor: "pointer",
                            color: "#0E7490",
                            fontWeight: 600,
                            fontSize: "1.1rem",
                            lineHeight: 1.2,
                        }}
                    >
                        Edit
                    </Box>

                    <input
                        id="foto-upload"
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleChange}
                    />
                </Box>
            </Box>
        </Box>
    );
}