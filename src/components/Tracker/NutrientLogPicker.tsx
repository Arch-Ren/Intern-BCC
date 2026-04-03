'use client'

import { Button } from "../ui/button";
import { ActionButton } from "../ui/Button/Action";
import { SelectedFood } from "@/components/Tracker/nutrientLog.types";
import { Makanan } from "@/services/makanan";

type NutrientLogPickerProps = {
    search: string;
    onSearchChange: (value: string) => void;
    filteredFoods: Makanan[];
    selectedFoods: SelectedFood[];
    onAddFood: (food: Makanan) => void;
    onRemoveFood: (foodId: string) => void;
    onSave: () => void;
};

export default function NutrientLogPicker({
    search,
    onSearchChange,
    filteredFoods,
    selectedFoods,
    onAddFood,
    onRemoveFood,
    onSave,
}: NutrientLogPickerProps) {

    return (
        <div className="bg-white w-full flex flex-col rounded-2xl border border-black overflow-hidden">
            <p className="text-2xl font-bold text-color4 p-4 border-b border-black w-full text-center">
                Pencatatan hari ini
            </p>

            <div className="p-4 flex flex-col gap-4">
                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full rounded-full bg-[#F1FFFB] border border-primary px-4 py-3 outline-none"
                    />

                    <Button
                        variant="outline"
                        className="rounded-full px-6 bg-[#F1FFFB] border-primary h-[50px]"
                    >
                        <img src="/images/Filter.png" alt="filter" width={30} height={30} />
                        Filter
                    </Button>
                </div>

                <div className="grid grid-rows-2 grid-flow-col auto-cols-max gap-3 overflow-x-auto">
                    {filteredFoods.map((food) => {
                        const isSelected = selectedFoods.some((item) => item.id === food.id);

                        return (
                            <button
                                key={food.id}
                                type="button"
                                onClick={() => {
                                    if (isSelected) {
                                        onRemoveFood(food.id);
                                    } else {
                                        onAddFood(food);
                                    }
                                }}
                                className={`flex items-center justify-between min-w-[400px] rounded-xl border px-4 py-3 text-left ${isSelected ? "" : "bg-[#F1FFFB] border-primary"
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <img src={food.image || "/images/default-food.png"} alt={food.nama} width={50} height={50} className="rounded-full object-cover aspect-square object-top" />
                                    <span>{food.nama}</span>
                                </div>
                                <span className="text-lg font-bold text-white bg-primary px-2 rounded-md">
                                    +
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <ActionButton
                variant="secondary"
                className="mx-20 my-4 font-semibold tracking-wider"
                rounded="xsm"
                onClick={() => onSave()}
                disabled={selectedFoods.length === 0}
            >
                Simpan
            </ActionButton>
        </div>
    );
}