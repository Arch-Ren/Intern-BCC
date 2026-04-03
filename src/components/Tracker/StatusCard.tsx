type StatusCardProps = {
    bmi: string;
    bmiNumber: number;
    className?: string;
};

export default function StatusCard({
    bmi,
    bmiNumber,
    className = "",
}: StatusCardProps) {
    return (
        <div
            className={`flex min-h-[170px] flex-col items-center justify-center rounded-[28px] bg-white p-6 shadow-xl ${className}`}
        >
            <h2 className="text-2xl font-extrabold text-[#1F3A58]">
                Status BMI
            </h2>

            <p className="mt-2 text-4xl font-extrabold text-[#00FF44] text-shadow-xl [text-shadow:1_2px_6px_rgba(0,0,0,0.2)] md:text-5xl">
                {bmi}
            </p>

            <span className="text-2xl font-semibold text-[#00FF44] [text-shadow:1_2px_6px_rgba(0,0,0,0.2)]">
                {bmiNumber > 0 ? bmiNumber : "-"}
            </span>
        </div>
    );
}