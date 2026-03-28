'use client'

import { createContext, useContext, useMemo, useState } from "react"
import { dummyChildren } from "@/data/Children"

type child = (typeof dummyChildren)[number]

interface selectedChildContextType {
    selectedChild: child
    selectedChildIndex: number
    setSelectedChildIndex: (index: number) => void
}

const selectedChildContext = createContext<selectedChildContextType | null>(null)

export function SelectedChildProvider({ children, }: { children: React.ReactNode}) {
    const [selectedChildIndex, setSelectedChildIndex] = useState(0)

    const selectedChild = useMemo(() => dummyChildren[selectedChildIndex], [selectedChildIndex])

    return(
        <selectedChildContext.Provider
            value={{
                selectedChild,
                selectedChildIndex,
                setSelectedChildIndex,
            }}>
                {children}
            </selectedChildContext.Provider>
    )
}

export function useSelectedChild() {
    const context = useContext(selectedChildContext)
    if(!context) {
        throw new Error("useSelectedChild must be useed within SelectedChildProvider")
    }

    return context
}