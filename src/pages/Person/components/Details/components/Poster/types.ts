export type PosterProps = {
  name?: string;
  path?: string | null;
  isLoading?: boolean;
  onClickPoster: (path: string) => void;
};
