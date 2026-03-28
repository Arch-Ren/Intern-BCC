type BaseButtonProps = {
    children: React.ReactNode;
    rounded?: "xsm" | "sm" | "md" | "lg" | "full";
    variant?: "primary" | "secondary"
    className?: string;
};

export function BaseButton({
    children,
    rounded = "md",
    variant = "primary",
    className = "",
}: BaseButtonProps) {
    const baseStyle = "border-none px-6 py-4 shadow-md flex justify-center items-center transition";

    const roundedStyle = {
        xsm: "rounded-[12px]",
        sm: "rounded-[30px]",
        md: "rounded-[36px]",
        lg: "rounded-[40px]",
        full: "rounded-full",
    };

    const variantStyle = {
        primary: "bg-primary text-white hover:bg-primaryHover active:bg-primaryActive active:scale-95 active:shadow-lg",
        secondary: "bg-color4 text-white hover:bg-color4Hover active:bg-color4Active active:scale-95 active:shadow-lg"
    };

    return (
        <span className={`${baseStyle} ${roundedStyle[rounded]} ${variantStyle[variant]} ${className}`}>
            {children}
        </span>
    )
}