import { ModelGridCard } from "./ModelGridCard";
import type { Model } from "../_types";

type ModelGridProps = {
  models: Model[];
  onModelClick?: (model: Model) => void;
};

export function ModelGrid({ models, onModelClick }: ModelGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 w-full">
      {models.map((model) => (
        <ModelGridCard key={model.id} model={model} onClick={onModelClick} />
      ))}
    </div>
  );
}
