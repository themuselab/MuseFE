"use client";

import { useCallback, useRef, type PointerEvent, type RefObject } from "react";
import type { EditorAPI } from "./useEditorState";
import type { Layer, ResizeHandle, TransformMode } from "../_types";

type GestureContext = {
  mode: TransformMode;
  handle: ResizeHandle | null;
  layerId: string;
  startLayer: Layer;
  startPctX: number;
  startPctY: number;
  centerPctX: number;
  centerPctY: number;
};

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export function usePointerTransform(
  canvasRef: RefObject<HTMLDivElement | null>,
  api: EditorAPI,
) {
  const ctxRef = useRef<GestureContext | null>(null);

  const toPct = useCallback(
    (e: PointerEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return { px: 0, py: 0 };
      return {
        px: ((e.clientX - rect.left) / rect.width) * 100,
        py: ((e.clientY - rect.top) / rect.height) * 100,
      };
    },
    [canvasRef],
  );

  const begin = useCallback(
    (
      e: PointerEvent,
      layer: Layer,
      mode: TransformMode,
      handle: ResizeHandle | null = null,
    ) => {
      e.stopPropagation();
      e.preventDefault();
      const target = e.currentTarget;
      if (target instanceof Element) {
        try {
          target.setPointerCapture(e.pointerId);
        } catch {
          // ignore
        }
      }
      const { px, py } = toPct(e);
      ctxRef.current = {
        mode,
        handle,
        layerId: layer.id,
        startLayer: { ...layer },
        startPctX: px,
        startPctY: py,
        centerPctX: layer.x + layer.width / 2,
        centerPctY: layer.y + layer.height / 2,
      };
      api.commit();
      api.select(layer.id);
    },
    [api, toPct],
  );

  const move = useCallback(
    (e: PointerEvent) => {
      const ctx = ctxRef.current;
      if (!ctx) return;
      e.preventDefault();
      const { px, py } = toPct(e);
      const dx = px - ctx.startPctX;
      const dy = py - ctx.startPctY;
      const start = ctx.startLayer;

      if (ctx.mode === "move") {
        const x = clamp(start.x + dx, -start.width + 5, 100 - 5);
        const y = clamp(start.y + dy, -start.height + 5, 100 - 5);
        api.updateLayer(ctx.layerId, { x, y });
        return;
      }

      if (ctx.mode === "resize" && ctx.handle) {
        let { x, y, width, height } = start;
        const right = start.x + start.width;
        const bottom = start.y + start.height;
        if (ctx.handle === "se") {
          width = clamp(start.width + dx, 5, 100 - start.x);
          height = clamp(start.height + dy, 5, 100 - start.y);
        } else if (ctx.handle === "ne") {
          width = clamp(start.width + dx, 5, 100 - start.x);
          height = clamp(start.height - dy, 5, bottom);
          y = bottom - height;
        } else if (ctx.handle === "sw") {
          width = clamp(start.width - dx, 5, right);
          x = right - width;
          height = clamp(start.height + dy, 5, 100 - start.y);
        } else if (ctx.handle === "nw") {
          width = clamp(start.width - dx, 5, right);
          x = right - width;
          height = clamp(start.height - dy, 5, bottom);
          y = bottom - height;
        }
        api.updateLayer(ctx.layerId, { x, y, width, height });
        return;
      }

      if (ctx.mode === "rotate") {
        const angle =
          (Math.atan2(py - ctx.centerPctY, px - ctx.centerPctX) * 180) / Math.PI + 90;
        api.updateLayer(ctx.layerId, { rotation: Math.round(angle) });
      }
    },
    [api, toPct],
  );

  const end = useCallback((e: PointerEvent) => {
    const target = e.currentTarget;
    if (target instanceof Element) {
      try {
        target.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
    ctxRef.current = null;
  }, []);

  return { begin, move, end };
}
