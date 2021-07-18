export type LoadMoreProps = {
  amount: number;
  total: number;
  mediaType: string;
  isLoading: boolean;
  hasNextPage?: boolean;
  onFetch: () => void;
};
