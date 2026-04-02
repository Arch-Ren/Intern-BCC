'use client'

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useChildrenStore } from "@/stores/children"
import type { Children } from "@/types/child"

interface SelectedChildContextType {
    selectedChild: Children | null
    selectedChildIndex: number
    setSelectedChildIndex: (index: number) => void
    children: Children[]
    isLoading: boolean
}

const SelectedChildContext = createContext<SelectedChildContextType | null>(null)

export function SelectedChildProvider({ children: reactChildren }: { children: React.ReactNode }) {
    const [selectedChildIndex, setSelectedChildIndex] = useState(0)

    const childrenData = useChildrenStore((state) => state.children)
    const isLoading = useChildrenStore((state) => state.isLoading)
    const fetchChildren = useChildrenStore((state) => state.fetchChildren)

    useEffect(() => {
        if (childrenData.length === 0 && !isLoading) {
            fetchChildren()
        }
    }, [childrenData.length, isLoading, fetchChildren])

    const selectedChild = useMemo(
        () => childrenData[selectedChildIndex] ?? null,
        [selectedChildIndex, childrenData]
    )

    return (
        <SelectedChildContext.Provider
            value={{
                selectedChild,
                selectedChildIndex,
                setSelectedChildIndex,
                children: childrenData,
                isLoading,
            }}>
            {reactChildren}
        </SelectedChildContext.Provider>
    )
}

export function useSelectedChild() {
    const context = useContext(SelectedChildContext)
    if (!context) {
        throw new Error("useSelectedChild must be used within SelectedChildProvider")
    }

    return context
}