import { Suspense } from "react";
import AuthShell from "@/components/forgotPassword/AuthShell";
import ResetPasswordForm from "@/components/forgotPassword/ResetPasswordForm";

export default function ResetPasswordPage() {
    return (
        <AuthShell pageTitle="New password" cardTitle="New Password">
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPasswordForm />
            </Suspense>
        </AuthShell>
    );
}
