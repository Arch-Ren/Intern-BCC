import AuthShell from "@/components/forgotPassword/AuthShell";
import ResetPasswordForm from "@/components/forgotPassword/ResetPasswordForm";

export default function ResetPasswordPage() {
    return (
        <AuthShell pageTitle="New password" cardTitle="New Password">
            <ResetPasswordForm />
        </AuthShell>
    );
}
