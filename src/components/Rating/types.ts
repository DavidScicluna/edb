type Size = 'sm' | 'md' | 'lg' | 'xl' | string;

export type Rating = number | string | undefined | null;

export type Count = number | undefined | null;

export type RatingProps = {
  children?: Rating;
  count?: Count;
  isLoading?: boolean;
  size?: Size;
} & Omit<Rating, 'rating'>;
