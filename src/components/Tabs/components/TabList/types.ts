export type Size = 'sm' | 'md';

export type Tab = {
  label: string;
  badge?: string;
  isDisabled?: boolean;
};

export type TabListProps = {
  renderTabs: Tab[];
  activeTab: number;
  size?: Size;
};
