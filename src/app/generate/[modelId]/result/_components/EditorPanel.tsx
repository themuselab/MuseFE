"use client";

import type { EditorAPI } from "../_hooks/useEditorState";
import type { Layer, TextLayer } from "../_types";
import { AddTextButton } from "./AddTextButton";
import { AlignmentControls } from "./AlignmentControls";
import { ColorSwatches } from "./ColorSwatches";
import { HistoryToolbar } from "./HistoryToolbar";
import { LayerPropertiesControls } from "./LayerPropertiesControls";
import { TextContentField } from "./TextContentField";
import { TextStyleControls } from "./TextStyleControls";

type EditorPanelProps = {
  api: EditorAPI;
  className?: string;
};

function isTextLayer(layer: Layer): layer is TextLayer {
  return layer.type === "text";
}

export function EditorPanel({ api, className = "" }: EditorPanelProps) {
  const { selected, addText, alignSelected, updateLayer, undo, redo, canUndo, canRedo } = api;

  return (
    <aside
      className={`flex flex-col gap-6 bg-neutral-50 border-l border-neutral-200 px-6 lg:px-10 py-8 ${className}`}
    >
      <HistoryToolbar canUndo={canUndo} canRedo={canRedo} onUndo={undo} onRedo={redo} />

      {!selected ? (
        <AddTextButton onClick={addText} />
      ) : (
        <>
          <AddTextButton onClick={addText} />
          {isTextLayer(selected) ? (
            <TextContentField
              value={selected.content}
              onChange={(content) => {
                api.commit();
                updateLayer<TextLayer>(selected.id, { content });
              }}
            />
          ) : null}
          <AlignmentControls onAlign={alignSelected} />
          <LayerPropertiesControls
            layer={selected}
            onChange={(patch) => {
              api.commit();
              updateLayer(selected.id, patch);
            }}
          />
          {isTextLayer(selected) ? (
            <>
              <TextStyleControls
                layer={selected}
                onChange={(patch) => {
                  api.commit();
                  updateLayer<TextLayer>(selected.id, patch);
                }}
              />
              <ColorSwatches
                value={selected.color}
                onChange={(color) => {
                  api.commit();
                  updateLayer<TextLayer>(selected.id, { color });
                }}
              />
            </>
          ) : null}
        </>
      )}
    </aside>
  );
}
