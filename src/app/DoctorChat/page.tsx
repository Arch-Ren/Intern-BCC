import { Suspense } from "react"
import ChatDoctorPageContent from "@/components/connect/ChatDoctorPage"

function Loading() {
    return <div>Loading...</div>
}

export default function ChatDoctorPage() {
    return (
        <Suspense fallback={<Loading />}>
            <ChatDoctorPageContent />
        </Suspense>
    )
}