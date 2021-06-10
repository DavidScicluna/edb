import { Theme } from '../../../../theme/types';

type TransitionsStyle = {
  transition: string;
};

export default (theme: Theme): TransitionsStyle => ({
  transition: `${theme.transition.duration.slower} ${theme.transition.easing['ease-in-out']}`
});
