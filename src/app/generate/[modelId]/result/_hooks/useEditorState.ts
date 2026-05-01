"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { MAX_HISTORY } from "../_constants";
import type {
  AlignAxis,
  AlignSide,
  EditorState,
  ImageLayer,
  Layer,
  TextLayer,
} from "../_types";

const IMAGE_LAYER_ID = "image-base";

function makeInitialState(imageSrc: string): EditorState {
  const image: ImageLayer = {
    id: IMAGE_LAYER_ID,
    type: "image",
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    rotation: 0,
    src: imageSrc,
  };
  return { layers: [image], selectedId: null };
}

function makeNewTextLayer(): TextLayer {
  return {
    id: `text-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    type: "text",
    x: 25,
    y: 40,
    width: 50,
    height: 12,
    rotation: 0,
    content: "텍스트를 입력하세요",
    fontFamily: "pretendard",
    fontSize: 24,
    bold: false,
    italic: false,
    underline: false,
    textAlign: "center",
    color: "#201d1f",
  };
}

function clone(state: EditorState): EditorState {
  return {
    selectedId: state.selectedId,
    layers: state.layers.map((l) => ({ ...l })),
  };
}

export function useEditorState(imageSrc: string) {
  const [state, setState] = useState<EditorState>(() => makeInitialState(imageSrc));
  const pastRef = useRef<EditorState[]>([]);
  const futureRef = useRef<EditorState[]>([]);
  const [historyVersion, setHistoryVersion] = useState(0);

  const commit = useCallback(() => {
    pastRef.current = [...pastRef.current.slice(-(MAX_HISTORY - 1)), clone(state)];
    futureRef.current = [];
    setHistoryVersion((v) => v + 1);
  }, [state]);

  const select = useCallback((id: string | null) => {
    setState((prev) => (prev.selectedId === id ? prev : { ...prev, selectedId: id }));
  }, []);

  const addText = useCallback(() => {
    pastRef.current = [...pastRef.current.slice(-(MAX_HISTORY - 1)), clone(state)];
    futureRef.current = [];
    const next = makeNewTextLayer();
    setState((prev) => ({
      layers: [...prev.layers, next],
      selectedId: next.id,
    }));
    setHistoryVersion((v) => v + 1);
  }, [state]);

  const deleteLayer = useCallback((id: string) => {
    if (id === IMAGE_LAYER_ID) return;
    pastRef.current = [...pastRef.current.slice(-(MAX_HISTORY - 1)), clone(state)];
    futureRef.current = [];
    setState((prev) => ({
      layers: prev.layers.filter((l) => l.id !== id),
      selectedId: prev.selectedId === id ? null : prev.selectedId,
    }));
    setHistoryVersion((v) => v + 1);
  }, [state]);

  const updateLayer = useCallback(
    <T extends Layer>(id: string, patch: Partial<T>) => {
      setState((prev) => ({
        ...prev,
        layers: prev.layers.map((l) =>
          l.id === id ? ({ ...l, ...patch } as Layer) : l,
        ),
      }));
    },
    [],
  );

  const alignSelected = useCallback((axis: AlignAxis, side: AlignSide) => {
    pastRef.current = [...pastRef.current.slice(-(MAX_HISTORY - 1)), clone(state)];
    futureRef.current = [];
    setState((prev) => {
      if (!prev.selectedId) return prev;
      return {
        ...prev,
        layers: prev.layers.map((l) => {
          if (l.id !== prev.selectedId) return l;
          if (axis === "h") {
            const x = side === "start" ? 0 : side === "center" ? 50 - l.width / 2 : 100 - l.width;
            return { ...l, x };
          }
          const y = side === "start" ? 0 : side === "center" ? 50 - l.height / 2 : 100 - l.height;
          return { ...l, y };
        }),
      };
    });
    setHistoryVersion((v) => v + 1);
  }, [state]);

  const undo = useCallback(() => {
    const past = pastRef.current;
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    pastRef.current = past.slice(0, -1);
    futureRef.current = [clone(state), ...futureRef.current].slice(0, MAX_HISTORY);
    setState(previous);
    setHistoryVersion((v) => v + 1);
  }, [state]);

  const redo = useCallback(() => {
    const future = futureRef.current;
    if (future.length === 0) return;
    const next = future[0];
    futureRef.current = future.slice(1);
    pastRef.current = [...pastRef.current.slice(-(MAX_HISTORY - 1)), clone(state)];
    setState(next);
    setHistoryVersion((v) => v + 1);
  }, [state]);

  const selected = useMemo(
    () => state.layers.find((l) => l.id === state.selectedId) ?? null,
    [state],
  );

  const canUndo = pastRef.current.length > 0;
  const canRedo = futureRef.current.length > 0;
  // historyVersion 의존: 외부 컴포넌트가 canUndo/canRedo 변화를 감지할 수 있도록
  void historyVersion;

  return {
    state,
    selected,
    select,
    addText,
    deleteLayer,
    updateLayer,
    alignSelected,
    commit,
    undo,
    redo,
    canUndo,
    canRedo,
  };
}

export type EditorAPI = ReturnType<typeof useEditorState>;
export const EDITOR_IMAGE_LAYER_ID = IMAGE_LAYER_ID;
