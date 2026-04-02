import { ActionButton } from "../ui/Button/Action";

import type { SelectedFood } from "./nutrientLog.types";

type NutrientLogSelectedProps = {
    selectedFoods: SelectedFood[];
    onRemoveFood: (foodId: string) => void;
    onGramChange: (foodId: string, value: number) => void;
    onBackToPicker: () => void;
    onSave: () => void;
};

export default function NutrientLogSelected({
    selectedFoods,
    onRemoveFood,
    onGramChange,
    onBackToPicker,
    onSave,
}: NutrientLogSelectedProps) {
    return (
        <div className="bg-white w-full flex flex-col rounded-2xl border border-black overflow-hidden p-4">
            <p className="text-2xl font-bold text-color4 p-4 border-b border-black w-full text-center">
                Pencatatan hari ini
            </p>

            <div className="p-4 flex flex-col gap-4">
                <div className="flex justify-start">
                    <button
                        type="button"
                        onClick={onBackToPicker}
                        className="rounded-xl border border-primary px-4 py-2 bg-[#F1FFFB]"
                    >
                        Tambah makanan
                    </button>
                </div>

                {selectedFoods.length > 0 && (
                    <div className="grid grid-rows-2 grid-flow-col auto-cols-max gap-3 overflow-x-auto py-4 border-t-[3px] border-[#0C7D8F]">
                        {selectedFoods.map((food) => (
                            <div
                                key={food.id}
                                className="flex items-center justify-between bg-[#F1FFFB] gap-3 rounded-xl border px-4 py-3 max-w-[600px]"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={food.image}
                                        alt={food.nama}
                                        width={50}
                                        height={50}
                                        className="rounded-full object-cover aspect-square object-top"
                                    />
                                    <span>{food.nama}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        min={0}
                                        value={food.gram}
                                        onChange={(e) =>
                                            onGramChange(food.id, Number(e.target.value))
                                        }
                                        className="w-28 rounded-lg border px-3 py-2"
                                    />
                                    <span className="font-medium">gram</span>

                                    <button
                                        type="button"
                                        onClick={() => onRemoveFood(food.id)}
                                        className="text-lg font-bold text-white bg-primary px-3 py-2 rounded-md"
                                    >
                                        -
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <ActionButton
                variant="secondary"
                className="font-semibold tracking-wider flex-1 w-full"
                rounded="xsm"
                onClick={onSave}
                disabled={selectedFoods.length === 0}
            >
                Simpan
            </ActionButton>
        </div>
    );
}