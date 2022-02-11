import { Department } from '../../types';

export type QuickTogglesProps = {
  departments: Department[];
  openedPanels: number;
  isLoading?: boolean;
  onTogglePanel: (index: number) => void;
  onToggleAllPanels: () => void;
};
