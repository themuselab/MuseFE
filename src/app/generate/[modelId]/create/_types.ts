export type Mood = {
  id: string;
  label: string;
  subtitle: string;
  ranking: "AI PICK" | null;
};

export type AdInfoFormState = {
  industry: string;
  itemName: string;
  description: string;
  selectedMood: Mood | null;
};

export type MoodSectionState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "result"; moods: Mood[] };
