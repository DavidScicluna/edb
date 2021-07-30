export type LoadMoreProps = {
  amount: number;
  total: number;
  mediaType: string;
  isLoading: boolean;
  isError?: boolean;
  hasNextPage?: boolean;
  onFetch: () => void;
};
