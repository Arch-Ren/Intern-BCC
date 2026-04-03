import AuthShell from "@/components/forgotPassword/AuthShell";
import ForgotPasswordForm from "@/components/forgotPassword/ForgotPasswordForm";

export default function ForgotPasswordPage() {
    return (
        <AuthShell pageTitle="" cardTitle="Forgot Password?">
            <ForgotPasswordForm />
        </AuthShell>
    );
}
