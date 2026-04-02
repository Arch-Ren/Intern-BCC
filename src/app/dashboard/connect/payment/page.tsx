import { Suspense } from "react"
import PaymentPageContent from "@/components/connect/PaymentPage"

function Loading() {
    return <div>Loading...</div>
}

export default function PaymentPage() {
    return (
        <Suspense fallback={<Loading />}>
            <PaymentPageContent />
        </Suspense>
    )
}