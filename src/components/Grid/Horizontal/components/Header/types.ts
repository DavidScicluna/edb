import { ScrollButtonsState } from '../../types';

export type HeaderProps = {
  title: string;
  isLoading: boolean;
  reset: boolean;
  scrollButtons: ScrollButtonsState;
  handleScrollClick: (direction: 'left' | 'right') => void;
};
