export type CreateReviewProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type Form = {
  review: string;
  rating: number | null;
};
