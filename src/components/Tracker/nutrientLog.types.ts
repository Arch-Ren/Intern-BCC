import { dummyFoods } from "@/data/Food";

export type NutrientLogView = "summary" | "picker" | "selected";

export type SelectedFood = (typeof dummyFoods)[number] & {
  gram: number;
};