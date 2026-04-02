'use client'

import { useEffect, useMemo, useState } from "react";

import { getFoods } from "@/lib/api/food";
import { FoodItem } from "@/data/Food";
import NutrientLogSummary from "./NutrientLogSummary";
import NutrientLogPicker from "./NutrientLogPicker";
import NutrientLogSelected from "./NutrientLogSelected";

import type { NutrientLogView, SelectedFood } from "./nutrientLog.types";

export default function NutrientLogContent() {
    const [view, setView] = useState<NutrientLogView>("summary");
    const [selectedFoods, setSelectedFoods] = useState<SelectedFood[]>([]);
    const [foods, setFoods] = useState<FoodItem[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                setLoading(true);
                const data = await getFoods();
                setFoods(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchFoods();
    }, []);

    const handleFoodsPicked = (foods: SelectedFood[]) => {
        setSelectedFoods(foods);
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

    const handleFinalSave = () => {
        console.log("saved:", selectedFoods);

        setSelectedFoods([]);
        setView("summary");
    };

    return (
        <>
            {view === "summary" && (
                <NutrientLogSummary onOpenPicker={() => setView("picker")} />
            )}

            {view === "picker" && (
                <NutrientLogPicker foods={foods} onSave={handleFoodsPicked} />
            )}

            {view === "selected" && (
                <NutrientLogSelected
                    selectedFoods={selectedFoods}
                    onRemoveFood={handleRemoveFood}
                    onGramChange={handleGramChange}
                    onBackToPicker={() => setView("picker")}
                    onSave={handleFinalSave}
                />
            )}
        </>
    );
}