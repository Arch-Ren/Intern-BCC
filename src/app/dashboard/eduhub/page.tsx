import EduhubCard from "@/components/EduhubCard"
import { dummyEduhub } from "@/data/Eduhub"
import { EduhubFilter } from "@/data/EduHubFilter"

export default function Eduhub() {
    return(
        <div className="bg-primary p-6 rounded-3xl">
            <div className="flex items-center gap-4 px-4 pb-8">
                <h3 className="text-white text-3xl leading-none whitespace-nowrap">Filter : </h3>
                <div className="flex gap-4 overflow-x-auto whitespace-nowrap">
                    {EduhubFilter.map((item) => (
                        <div key={item.id} className="bg-white px-4 h-[40px] flex items-center justify-center rounded-[36px] text-primary shrink-0">{item.label}</div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {dummyEduhub.map((item) => (
                    <EduhubCard key={item.id} item={item}/>
                ))}
            </div>
        </div>
    )
}