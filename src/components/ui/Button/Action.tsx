import { BaseButton } from "./Base"

type ActionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    rounded?: "xsm" | "sm" | "md" | "lg" | "full";
    variant?: "primary" | "secondary";
    className?: string;
};

export function ActionButton({
    children,
    rounded,
    variant,
    className,
    ...props
}: ActionButtonProps) {
    return (
        <button {...props}>
            <BaseButton rounded={rounded} variant={variant} className={className}>
                {children}
            </BaseButton>
        </button>
    )
}