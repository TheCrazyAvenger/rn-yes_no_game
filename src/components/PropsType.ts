//Card
export interface CardFields {
  title: string;
  titleRu: string;
  story: string;
  storyRu: string;
  answer: string;
  answerRu: string;
  image: any;
  rating: number;
  difficulty: number;
  time: number;
  id: string;
  date: string;
  reviewedByUser: boolean;
}

export type CardProps = {
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
  reviewedByUser: boolean;
  image: string;
};

export type ProfileItemProps = {
  showLine?: boolean;
  title: string;
  icon: string;
  color: string;
  onPress: (...args: any) => any;
};

export type ProfileItemHeaderProps = {
  title: string;
  description: string;
  titleColor: string;
  showCloseButton?: boolean;
};
