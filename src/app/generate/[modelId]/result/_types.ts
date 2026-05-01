export type FontKey = "pretendard" | "nanum-myeongjo" | "nanum-gothic" | "nanum-pen";

export type TextAlign = "left" | "center" | "right";

export type BaseLayer = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
};

export type ImageLayer = BaseLayer & {
  type: "image";
  src: string;
};

export type TextLayer = BaseLayer & {
  type: "text";
  content: string;
  fontFamily: FontKey;
  fontSize: number;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  textAlign: TextAlign;
  color: string;
};

export type Layer = ImageLayer | TextLayer;

export type EditorState = {
  layers: Layer[];
  selectedId: string | null;
};

export type AlignAxis = "h" | "v";
export type AlignSide = "start" | "center" | "end";

export type TransformMode = "move" | "resize" | "rotate";
export type ResizeHandle = "nw" | "ne" | "sw" | "se";
