export type QuickTogglesProps = {
  seasons?: string[];
  openedSeasons: number;
  isError?: boolean;
  isLoading?: boolean;
  onToggleSeason: (index: number) => void;
  onToggleAllSeasons: () => void;
};
