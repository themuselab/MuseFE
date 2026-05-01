"use client";

import { useEffect, useRef, useState } from "react";
import { ThreeDots } from "@/components/ThreeDots";
import { MoodCard } from "./MoodCard";
import type { MoodSectionState } from "../_types";

type MoodSectionProps = {
  state: MoodSectionState;
  itemName: string;
  selectedMoodId: string | null;
  onSelectMood: (id: string) => void;
};

function InfoIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6.667" stroke="#92878C" strokeWidth="1.5" />
      <path
        d="M8 11.333V7.667"
        stroke="#92878C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="8" cy="5" r="0.5" fill="#92878C" />
    </svg>
  );
}

function LoadingDots() {
  const [activeIndex, setActiveIndex] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => ((prev + 1) % 3) as 0 | 1 | 2);
    }, 350);
    return () => clearInterval(id);
  }, []);

  return <ThreeDots activeIndex={activeIndex} />;
}

function HelpTooltip() {
  return (
    <div
      role="tooltip"
      className="absolute top-full left-0 mt-2 z-20 w-max max-w-xs"
    >
      <span
        aria-hidden="true"
        className="absolute -top-1.5 left-3 w-3 h-3 bg-neutral-900 rotate-45"
      />
      <div className="relative bg-neutral-900 text-neutral-50 text-caption-m px-3.5 py-3 rounded-md shadow-md">
        업종과 아이템을 입력하면 어울리는 분위기를 추천해드릴게요
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center gap-3 py-3">
      <LoadingDots />
      <span className="text-caption-m text-neutral-500">
        AI가 추천 분위기를 가져오고 있어요
      </span>
    </div>
  );
}

function ResultState({
  itemName,
  selectedMoodId,
  state,
  onSelectMood,
}: {
  itemName: string;
  selectedMoodId: string | null;
  state: Extract<MoodSectionState, { kind: "result" }>;
  onSelectMood: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-caption-m text-neutral-700">
        님이 입력하신 &lsquo;{itemName}&rsquo;와 어울리면서 가장 추천되는 분위기 TOP3예요!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {state.moods.map((mood) => (
          <MoodCard
            key={mood.id}
            mood={mood}
            selected={selectedMoodId === mood.id}
            onClick={onSelectMood}
          />
        ))}
      </div>
    </div>
  );
}

export function MoodSection({
  state,
  itemName,
  selectedMoodId,
  onSelectMood,
}: MoodSectionProps) {
  const [helpOpen, setHelpOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!helpOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(e.target as Node)
      ) {
        setHelpOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [helpOpen]);

  return (
    <section className="flex flex-col gap-3">
      <header
        ref={headerRef}
        className="relative flex items-center gap-1 self-start"
      >
        <span className="text-caption-m text-neutral-700">분위기</span>
        <button
          type="button"
          aria-label="분위기 안내"
          aria-expanded={helpOpen}
          onClick={() => setHelpOpen((v) => !v)}
          className="cursor-pointer text-neutral-500 flex items-center justify-center"
        >
          <InfoIcon />
        </button>
        {helpOpen ? <HelpTooltip /> : null}
      </header>

      {state.kind === "loading" ? <LoadingState /> : null}
      {state.kind === "result" ? (
        <ResultState
          itemName={itemName}
          selectedMoodId={selectedMoodId}
          state={state}
          onSelectMood={onSelectMood}
        />
      ) : null}
    </section>
  );
}
