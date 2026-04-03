import type { Makanan } from "@/services/makanan";

export type NutrientLogView = "summary" | "picker" | "selected";

export type SelectedFood = Makanan & {
  gram: number;
};