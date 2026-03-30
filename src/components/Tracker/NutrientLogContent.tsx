'use client'

import { useMemo, useState } from "react";

import { dummyFoods, FoodItem } from "@/data/Food";

import NutrientLogSummary from "./NutrientLogSummary";
import NutrientLogPicker from "./NutrientLogPicker";
import NutrientLogSelected from "./NutrientLogSelected";

import type { NutrientLogView, SelectedFood } from "./nutrientLog.types";

export default function NutrientLogContent() {
    const [view, setView] = useState<NutrientLogView>("summary");
    const [search, setSearch] = useState("");
    const [selectedFoods, setSelectedFoods] = useState<SelectedFood[]>([]);

    const filteredFoods = useMemo(() => {
        return dummyFoods.filter((food) =>
        food.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    const handleAddFood = (food: FoodItem) => {
        const exists = selectedFoods.some((item) => item.id === food.id);
        if (exists) return;

        setSelectedFoods((prev) => [...prev, { ...food, gram: 0 }]);
        setView("selected");
    };

    const handleRemoveFood = (foodId: number) => {
        const updated = selectedFoods.filter((item) => item.id !== foodId);
        setSelectedFoods(updated);

        if (updated.length === 0) {
            setView("picker");
        }
    };

    const handleGramChange = (foodId: number, value: number) => {
        setSelectedFoods((prev) =>prev.map((item) => item.id === foodId ? { ...item, gram: value } : item));
    };

    const handleSave = () => {
        console.log("saved:", selectedFoods);

        setSelectedFoods([]);
        setView("summary");
        setSearch("");
    };

    return (
        <>
            {view === "summary" && (
                <NutrientLogSummary onOpenPicker={() => setView("picker")} />
            )}

            {view === "picker" && (
                <NutrientLogPicker
                    search={search}
                    onSearchChange={setSearch}
                    filteredFoods={filteredFoods}
                    selectedFoods={selectedFoods}
                    onAddFood={handleAddFood}
                    onRemoveFood={handleRemoveFood}
                    onSave={handleSave}
                />
            )}

            {view === "selected" && (
                <NutrientLogSelected
                    search={search}
                    onSearchChange={setSearch}
                    filteredFoods={filteredFoods}
                    selectedFoods={selectedFoods}
                    onAddFood={handleAddFood}
                    onRemoveFood={handleRemoveFood}
                    onGramChange={handleGramChange}
                    onBackToPicker={() => setView("picker")}
                    onSave={handleSave}
                />
            )}
        </>
    );
}