export type QuickTogglesProps = {
  departments: string[];
  isLoading?: boolean;
  onTogglePanel: (index: number) => void;
};
