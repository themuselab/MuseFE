"use client";

import Image from "next/image";
import { type RefObject } from "react";
import { FONT_VAR_BY_KEY } from "../_constants";
import type { EditorAPI } from "../_hooks/useEditorState";
import { EDITOR_IMAGE_LAYER_ID } from "../_hooks/useEditorState";
import { usePointerTransform } from "../_hooks/usePointerTransform";
import type { ImageLayer, Layer, ResizeHandle, TextLayer } from "../_types";

type EditorCanvasProps = {
  api: EditorAPI;
  canvasRef: RefObject<HTMLDivElement | null>;
};

const HANDLE_POSITIONS: ReadonlyArray<{ key: ResizeHandle; className: string }> = [
  { key: "nw", className: "left-0 top-0 -translate-x-1/2 -translate-y-1/2 cursor-nwse-resize" },
  { key: "ne", className: "right-0 top-0 translate-x-1/2 -translate-y-1/2 cursor-nesw-resize" },
  { key: "sw", className: "left-0 bottom-0 -translate-x-1/2 translate-y-1/2 cursor-nesw-resize" },
  { key: "se", className: "right-0 bottom-0 translate-x-1/2 translate-y-1/2 cursor-nwse-resize" },
];

function DragDots() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="3" cy="3" r="1.2" fill="#f3498d" />
      <circle cx="9" cy="3" r="1.2" fill="#f3498d" />
      <circle cx="3" cy="9" r="1.2" fill="#f3498d" />
      <circle cx="9" cy="9" r="1.2" fill="#f3498d" />
    </svg>
  );
}

function CloseX() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path
        d="M2 2l8 8M10 2l-8 8"
        stroke="#534b4f"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function EditorCanvas({ api, canvasRef }: EditorCanvasProps) {
  const transform = usePointerTransform(canvasRef, api);
  const { state, select, deleteLayer } = api;

  const handleCanvasClick = () => select(null);

  return (
    <div className="w-full max-w-[507px] mx-auto">
      <div
        ref={canvasRef}
        onPointerDown={handleCanvasClick}
        className="relative w-full aspect-[396/528] rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50 select-none touch-none"
      >
        {state.layers.map((layer) =>
          layer.type === "image" ? (
            <LayerView
              key={layer.id}
              layer={layer}
              isImage
              selected={state.selectedId === layer.id}
              onPointerDown={(e) => transform.begin(e, layer, "move")}
              onPointerMove={transform.move}
              onPointerUp={transform.end}
              onPointerCancel={transform.end}
              onResizeBegin={(e, h) => transform.begin(e, layer, "resize", h)}
              onRotateBegin={(e) => transform.begin(e, layer, "rotate")}
              onDelete={() => deleteLayer(layer.id)}
              canDelete={false}
              canRotate={false}
            >
              <Image
                src={layer.src}
                alt="결과 이미지"
                fill
                draggable={false}
                className="object-cover pointer-events-none"
                sizes="(min-width: 1024px) 507px, 100vw"
              />
            </LayerView>
          ) : (
            <LayerView
              key={layer.id}
              layer={layer}
              selected={state.selectedId === layer.id}
              onPointerDown={(e) => transform.begin(e, layer, "move")}
              onPointerMove={transform.move}
              onPointerUp={transform.end}
              onPointerCancel={transform.end}
              onResizeBegin={(e, h) => transform.begin(e, layer, "resize", h)}
              onRotateBegin={(e) => transform.begin(e, layer, "rotate")}
              onDelete={() => deleteLayer(layer.id)}
              canDelete
              canRotate
            >
              <TextContent layer={layer} />
            </LayerView>
          ),
        )}
      </div>
    </div>
  );
}

type LayerViewProps = {
  layer: Layer;
  selected: boolean;
  isImage?: boolean;
  canDelete: boolean;
  canRotate: boolean;
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerUp: (e: React.PointerEvent) => void;
  onPointerCancel: (e: React.PointerEvent) => void;
  onResizeBegin: (e: React.PointerEvent, handle: ResizeHandle) => void;
  onRotateBegin: (e: React.PointerEvent) => void;
  onDelete: () => void;
  children: React.ReactNode;
};

function LayerView({
  layer,
  selected,
  isImage,
  canDelete,
  canRotate,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onResizeBegin,
  onRotateBegin,
  onDelete,
  children,
}: LayerViewProps) {
  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      className={[
        "absolute origin-center",
        selected
          ? "outline outline-2 outline-pink-400 outline-offset-[-2px]"
          : isImage
            ? ""
            : "",
        isImage ? "" : "cursor-move",
      ].join(" ")}
      style={{
        left: `${layer.x}%`,
        top: `${layer.y}%`,
        width: `${layer.width}%`,
        height: `${layer.height}%`,
        transform: `rotate(${layer.rotation}deg)`,
      }}
    >
      {children}
      {selected ? (
        <>
          {HANDLE_POSITIONS.map(({ key, className }) => (
            <div
              key={key}
              onPointerDown={(e) => onResizeBegin(e, key)}
              className={`absolute w-3 h-3 rounded-full bg-neutral-50 border border-pink-400 ${className}`}
            />
          ))}
          {canRotate ? (
            <button
              type="button"
              onPointerDown={onRotateBegin}
              aria-label="회전"
              className="absolute -right-3.5 -top-3.5 w-6 h-6 rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center cursor-grab"
            >
              <DragDots />
            </button>
          ) : null}
          {canDelete ? (
            <button
              type="button"
              onPointerDown={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              aria-label="삭제"
              className="absolute -left-3.5 -top-3.5 w-6 h-6 rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center cursor-pointer"
            >
              <CloseX />
            </button>
          ) : null}
        </>
      ) : null}
    </div>
  );
}

function TextContent({ layer }: { layer: TextLayer }) {
  return (
    <div
      className="w-full h-full flex items-center px-1 pointer-events-none"
      style={{
        fontFamily: FONT_VAR_BY_KEY[layer.fontFamily],
        fontSize: `${layer.fontSize}px`,
        fontWeight: layer.bold ? 700 : 400,
        fontStyle: layer.italic ? "italic" : "normal",
        textDecoration: layer.underline ? "underline" : "none",
        color: layer.color,
        textAlign: layer.textAlign,
        justifyContent:
          layer.textAlign === "center"
            ? "center"
            : layer.textAlign === "right"
              ? "flex-end"
              : "flex-start",
        whiteSpace: "pre-wrap",
        lineHeight: 1.2,
      }}
    >
      {layer.content || " "}
    </div>
  );
}

void EDITOR_IMAGE_LAYER_ID;
void ({} as ImageLayer);
