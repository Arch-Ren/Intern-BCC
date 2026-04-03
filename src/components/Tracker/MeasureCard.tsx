import { ActionButton } from "../ui/Button/Action";
import Image from "next/image";

type MeasureCardProps = {
    title: string;
    value: number;
    unit: string;
    actionType: "button" | "icon";
    className?: string;
    onEdit?: () => void;
};

export default function MeasureCard({
    title,
    value,
    unit,
    actionType = "button",
    className = "",
    onEdit,
}: MeasureCardProps) {
    return (
        <div
            className={`flex min-h-[10px] flex-col justify-between rounded-[28px] bg-white p-6 shadow-xl ${className}`}
        >
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-3xl font-bold text-[#1F3A58]">{title}</h2>

                <div className="flex items-center gap-4">
                    <div className="flex max-h-[45px] items-center gap-4 rounded-[18px] border border-slate-500 px-5 py-2 text-3xl font-bold text-[#1F3B63]">
                        {value}
                        <span>{unit}</span>
                    </div>

                    {actionType === "icon" && (
                        <ActionButton variant="icon" onClick={onEdit}>
                            <Image
                                src="/images/Pencil.png"
                                alt="edit"
                                width={27}
                                height={27}
                            />
                        </ActionButton>
                    )}
                </div>
            </div>

            {actionType === "button" && (
                <div className="flex justify-end">
                    <ActionButton
                        variant="primary"
                        rounded="xsm"
                        className="max-h-[40px] w-[120px]"
                        onClick={onEdit}
                    >
                        Edit
                    </ActionButton>
                </div>
            )}
        </div>
    );
}