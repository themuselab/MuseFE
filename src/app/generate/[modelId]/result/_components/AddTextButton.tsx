"use client";

type AddTextButtonProps = {
  onClick: () => void;
};

export function AddTextButton({ onClick }: AddTextButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full h-12 rounded border border-dashed border-pink-400 text-pink-500 text-label-l cursor-pointer hover:bg-pink-50"
    >
      + 텍스트 추가
    </button>
  );
}
