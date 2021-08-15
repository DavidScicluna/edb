import { Theme } from '../../../../theme/types';

type TransitionsStyle = {
  transition: string;
};

export default (theme: Theme): TransitionsStyle => ({
  transition: `${theme.transition.duration['ultra-slow']} ${theme.transition.easing['ease-in-out']}`
});
