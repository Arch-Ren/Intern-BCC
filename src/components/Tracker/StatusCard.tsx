type StatusCardProps ={
    bmi: string
    bmiNumber: number
};

export default function StatusCard({ bmi, bmiNumber }: StatusCardProps) {
    return(
        <div className="flex min-h-[170px] flex-col items-center justify-center rounded-[28px] bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-extrabold text-[#1F3A58]">Status BMI</h2>
            <p className="mt-2 text-4xl font-extrabold text-[#00FF44] md:text-5xl text-shadow-xl [text-shadow:1_2px_6px_rgba(0,0,0,0.2)]">{bmi}</p>
            <span className="text-2xl text-[#00FF44] font-semibold [text-shadow:1_2px_6px_rgba(0,0,0,0.2)]">{bmiNumber}</span>
        </div>
    )
}