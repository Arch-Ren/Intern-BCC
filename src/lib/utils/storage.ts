export const FORGOT_PASSWORD_EMAIL_KEY = "forgot_password_email";
export const RESET_PASSWORD_TOKEN_KEY = "reset_password_token";
export const VERIFIED_OTP_KEY = "verified_otp";

export const storage = {
    setEmail(email: string) {
        if (typeof window !== "undefined") {
            sessionStorage.setItem(FORGOT_PASSWORD_EMAIL_KEY, email);
        }
    },

    getEmail() {
        if (typeof window === "undefined") return "";
        return sessionStorage.getItem(FORGOT_PASSWORD_EMAIL_KEY) || "";
    },

    setToken(token: string) {
        if (typeof window !== "undefined") {
            sessionStorage.setItem(RESET_PASSWORD_TOKEN_KEY, token);
        }
    },

    getToken() {
        if (typeof window === "undefined") return "";
        return sessionStorage.getItem(RESET_PASSWORD_TOKEN_KEY) || "";
    },

    setOtpVerified(value: boolean) {
        if (typeof window !== "undefined") {
            sessionStorage.setItem(VERIFIED_OTP_KEY, JSON.stringify(value));
        }
    },

    getOtpVerified() {
        if (typeof window === "undefined") return false;
        return sessionStorage.getItem(VERIFIED_OTP_KEY) === "true";
    },

    clearForgotPasswordFlow() {
        if (typeof window !== "undefined") {
            sessionStorage.removeItem(FORGOT_PASSWORD_EMAIL_KEY);
            sessionStorage.removeItem(RESET_PASSWORD_TOKEN_KEY);
            sessionStorage.removeItem(VERIFIED_OTP_KEY);
        }
    },
};
