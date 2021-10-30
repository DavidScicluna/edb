export type LoadMoreProps = {
  amount: number;
  total: number;
  label: string;
  isLoading?: boolean;
  isButtonVisible?: boolean;
  onClick: () => void;
};
