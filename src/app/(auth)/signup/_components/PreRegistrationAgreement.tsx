"use client";

import { Checkbox } from "@/components/Checkbox";
import type { AgreementContent } from "@/constants/app";

type PreRegistrationAgreementProps = {
  label: string;
  required: boolean;
  checked: boolean;
  onChange: (checked: boolean) => void;
  expanded: boolean;
  onToggleExpand: () => void;
  content: AgreementContent;
};

function HelpCircleIcon({ active }: { active: boolean }) {
  const stroke = active ? "#f3498d" : "#534b4f";
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill={active ? "#ffd1e3" : "none"}
      className="shrink-0"
    >
      <circle cx="9" cy="9" r="7.5" stroke={stroke} strokeWidth="1.5" />
      <path
        d="M6.82 6.75a2.25 2.25 0 0 1 4.37.75c0 1.5-2.25 2.25-2.25 2.25"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="9" cy="13.5" r="0.75" fill={stroke} />
    </svg>
  );
}

export function PreRegistrationAgreement({
  label,
  required,
  checked,
  onChange,
  expanded,
  onToggleExpand,
  content,
}: PreRegistrationAgreementProps) {
  return (
    <div className="flex flex-col w-full">
      {/* Row */}
      <div className="flex items-center justify-between gap-3 w-full">
        <div className="flex items-center gap-4">
          <Checkbox
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
          />
          <div className="flex items-center gap-0.5">
            <span className="text-heading-xs text-neutral-700">{label}</span>
            {required && (
              <span className="text-[14px] font-medium leading-[1.43] tracking-[-0.28px] text-pink-400 ml-0.5">
                *
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleExpand}
          className="cursor-pointer shrink-0"
          aria-expanded={expanded}
          aria-label={expanded ? "동의 내용 접기" : "동의 내용 보기"}
        >
          <HelpCircleIcon active={expanded} />
        </button>
      </div>

      {/* Accordion */}
      {expanded && (
        <div className="mt-1 flex flex-col gap-9 rounded bg-pink-50 border border-pink-400 px-5 pt-5 pb-4 w-full">
          <div className="flex flex-col gap-5">
            {/* Heading */}
            <div className="flex items-stretch gap-1">
              <div className="w-0.5 rounded-full bg-pink-400" />
              <span className="text-label-l text-neutral-900">
                {content.heading}
              </span>
            </div>

            {/* Sections */}
            {content.sections.map((section, idx) => (
              <div key={section.title} className="flex items-start gap-1 w-full">
                <div className="flex items-center justify-center rounded-full bg-pink-400 w-4 h-4 shrink-0 mt-px">
                  <span className="text-[11px] font-semibold leading-none tracking-[0.88px] text-neutral-50 text-center">
                    {idx + 1}
                  </span>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <span className="text-[14px] font-semibold leading-none tracking-[0.028px] text-neutral-700">
                    {section.title}
                  </span>
                  <div className="flex flex-col gap-1">
                    {section.items.map((item) => (
                      <span
                        key={item.text}
                        className={
                          item.muted
                            ? "text-[12px] font-normal leading-[1.333] text-neutral-500"
                            : "text-caption-m text-neutral-700"
                        }
                      >
                        {item.text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-overline text-pink-400 whitespace-pre-line">
            {content.footer}
          </p>
        </div>
      )}
    </div>
  );
}
