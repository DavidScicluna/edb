export type QuickTogglesProps = {
  departments: string[];
  openedPanels: number;
  isLoading?: boolean;
  onTogglePanel: (index: number) => void;
  onToggleAllPanels: () => void;
};
