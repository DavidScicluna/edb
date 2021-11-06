export type PosterProps = {
  name?: string;
  path?: string | null;
  isLoading?: boolean;
  isError?: boolean;
  onClickPoster: (path: string) => void;
};
