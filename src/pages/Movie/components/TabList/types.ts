export type Tab = {
  label: string;
  badge?: string;
  isDisabled?: boolean;
};

export type TabListProps = {
  activeTab: number;
  reviews: number;
  castCrew: number;
  isDisabled: { credits: boolean; reviews: boolean };
};
