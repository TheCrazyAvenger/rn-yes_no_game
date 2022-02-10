//Card
export interface CardFields {
  title: string;
  story: string;
  answer: string;
  image: any;
  rating: number;
  difficulty: number;
  time: number;
  id: string;
  date: string;
}

export type CardProps = {
  canOpen?: boolean;
  data: CardFields;
};

export type StoryInfoProps = {
  rating: number;
  difficulty: number;
  time: number;
  date: string;
};

export type ReviewModalProps = {
  id: string;
};
