export type TopModel = {
  id: string;
  rank: number;
  name: string;
  tags: string[];
  imageUrl: string | null;
};

export type UseCase = {
  id: string;
  category: string;
  title: string;
  description: string;
  beforeImageUrl: string | null;
  afterImageUrl: string | null;
};
