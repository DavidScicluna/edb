export type QuickTogglesProps = {
  assets: string[];
  openedPanels: number;
  isLoading?: boolean;
  onTogglePanel: (index: number) => void;
  onToggleAllPanels: () => void;
};
