"use client"

import { useState } from "react"
import { dummyChildren } from "@/data/Children"
import EditChildProfileModal from "./EditChildProfileModal"
import ChildProfileList from "./ChildProfileList"

interface SwitchChildrenModalProps {
  isOpen: boolean
  selectedIndex: number
  onClose: () => void
  onSelect: (index: number) => void
}

export default function ProfileSwitchModal({
  isOpen,
  selectedIndex,
  onClose,
  onSelect,
}: SwitchChildrenModalProps) {
  const [editIndex, setEditIndex] = useState<number | null>(null)

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        onClick={onClose}
      >
        <div
          className="relative min-w-[500px] rounded-[32px] bg-white p-4 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-6 top-5 text-xl font-bold text-black"
          >
            x
          </button>

          <div className="pb-6 text-center">
            <h2 className="text-xl font-bold">Profil Anak</h2>
          </div>

          <ChildProfileList
            selectedIndex={selectedIndex}
            onSelect={onSelect}
            onEdit={setEditIndex}
          />
        </div>
      </div>

      <EditChildProfileModal
        isOpen={editIndex !== null}
        child={editIndex !== null ? dummyChildren[editIndex] : null}
        onClose={() => setEditIndex(null)}
      />
    </>
  )
}