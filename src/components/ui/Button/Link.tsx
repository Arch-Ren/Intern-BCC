import Link from "next/link";
import { BaseButton } from "./Base";

type LinkButtonProps = {
    href: string;
    children: React.ReactNode;
    rounded?: "xsm" | "sm" | "md" | "lg" | "full";
    variant?: "primary" | "secondary" | "icon";
    className?: string;
}
export function LinkButton({
    href,
    children,
    rounded,
    variant,
    className,
}: LinkButtonProps) {
    return(
        <Link href={href}>
            <BaseButton rounded={rounded} variant={variant} className={className}>
                {children}
            </BaseButton>
        </Link>
    )
}