export type ArrowProps = {
  direction: 'left' | 'right';
  isDisabled: boolean;
  reset: boolean;
  onScrollClick: (direction: 'left' | 'right') => void;
};
