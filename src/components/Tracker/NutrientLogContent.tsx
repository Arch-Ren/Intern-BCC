'use client'

import { useEffect, useMemo, useState } from "react";
import NutrientLogSummary from "./NutrientLogSummary";
import NutrientLogPicker from "./NutrientLogPicker";
import NutrientLogSelected from "./NutrientLogSelected";

import type { NutrientLogView, SelectedFood } from "./nutrientLog.types";
import { fetchMakananService, type Makanan } from "@/services/makanan";
import { addFoodLogService } from "@/services/makananLog";
import { useSelectedChild } from "@/context/SelectedChild";

export default function NutrientLogContent() {
    const [view, setView] = useState<NutrientLogView>("summary");
    const [selectedFoods, setSelectedFoods] = useState<SelectedFood[]>([]);
    const [foods, setFoods] = useState<Makanan[]>([]);
    const [isLoadingFoods, setIsLoadingFoods] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        let isCancelled = false;
        setIsLoadingFoods(true);

        fetchMakananService()
            .then((data) => {
                if (!isCancelled) setFoods(data);
            })
            .catch((err) => {
                console.error("Gagal load makanan:", err);
            })
            .finally(() => {
                if (!isCancelled) setIsLoadingFoods(false);
            });

        return () => {
            isCancelled = true;
        };
    }, []);

    const filteredFoods = useMemo(() => {
        return foods.filter((food: Makanan) =>
            food.nama.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, foods]);

    const handleAddFood = (food: Makanan) => {
        const exists = selectedFoods.some((item) => item.id === food.id);
        if (exists) return;

        setSelectedFoods((prev) => [...prev, { ...food, gram: 0 }]);
        setView("selected");
    };

    const handleRemoveFood = (foodId: string) => {
        const updated = selectedFoods.filter((item) => item.id !== foodId);
        setSelectedFoods(updated);

        if (updated.length === 0) {
            setView("picker");
        }
    };

    const handleGramChange = (foodId: string, value: number) => {
        setSelectedFoods((prev) =>
            prev.map((item) =>
                item.id === foodId ? { ...item, gram: value } : item
            )
        );
    };

    const [isSaving, setIsSaving] = useState(false);
    const { selectedChild } = useSelectedChild();

    const handleSave = async () => {
        if (!selectedChild?.id || selectedFoods.length === 0) return;

        setIsSaving(true);
        try {
            const payload = {
                makanan: selectedFoods.map((food) => ({
                    makanan_id: food.id,
                    gram: food.gram,
                })),
            };

            await addFoodLogService(selectedChild.id, payload);
            console.log("saved food log:", payload);

            setSelectedFoods([]);
            setView("summary");
            setSearch("");
        } catch (error) {
            console.error("Failed to save food log:", error);
            // Ideally show toast error here
        } finally {
            setIsSaving(false);
        }
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
                    onSave={() => setView("selected")}
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