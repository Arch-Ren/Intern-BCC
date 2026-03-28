import { ActionButton } from "../ui/Button/Action";

type MeasureCardProps ={
    title: string
    value: number
    unit: string
};

export default function MeasureCard({ title, value, unit }: MeasureCardProps) {
    return(
        <div className="flex min-h-[170px] flex-col justify-between rounded-[28px] bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
                <h2 className="text-3xl text-[#1F3A58] font-extrabold">{title}</h2>

                <div className=" max-h-[45px] rounded-[18px] border border-slate-500 px-5 py-2 text-3xl font-bold text-[#1F3B63] flex gap-4 items-center">
                    {value}
                    <span className="text-3xl font-bold">{unit}</span>
                </div>
            </div>

            <div className="flex justify-end">
                <ActionButton variant="primary" rounded="xsm" className="w-[120px] max-h-[40px]">Edit</ActionButton>
            </div>
        </div>
    )
}