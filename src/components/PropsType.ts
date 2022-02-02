//Card
export interface Card {
  title: string;
  story: string;
  answer: string;
  image: any;
  id: string;
}

export type CardProps = {
  canOpen?: boolean;
  data: Card;
};
