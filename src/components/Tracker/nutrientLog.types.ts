import { FoodItem } from "@/data/Food";

export type NutrientLogView = "summary" | "picker" | "selected";

export type SelectedFood = FoodItem & {
  gram: number;
};