export type LoadMoreProps = {
  amount: number;
  total: number;
  type: string;
  isLoading: boolean;
  onFetch: () => void;
};
