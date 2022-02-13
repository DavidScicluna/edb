export type QuickToggle = {
  id: string;
  title: string;
};

export type QuickTogglesProps = {
  accordions: QuickToggle[];
  openedPanels: number;
  isLoading?: boolean;
  isDisabled?: boolean;
  onToggleAccordion: (id: QuickToggle['id']) => void;
  onToggleAllAccordions: () => void;
};
