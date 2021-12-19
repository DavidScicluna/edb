import { Style } from '../../../../../../../../common/types';
import { Theme } from '../../../../../../../../theme/types';

type DummyAccordionItemStyle = {
  common: { button: Style; icon: Style };
};

export default (theme: Theme): DummyAccordionItemStyle => ({
  common: {
    button: {
      'width': '100%',

      'display': 'flex',
      'justifyContent': 'space-between',

      'backgroundColor': 'transparent',
      'border': 'none',
      'borderRadius': 'lg',

      'padding': `${theme.space[1]} ${theme.space[2]}`,

      'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`,

      '&:focus': { boxShadow: 'none' }
    },
    icon: {
      'transform': 'rotate(270deg)',

      '&.MuiSvgIcon-root': {
        fontSize: 'xl',

        transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
      }
    }
  }
});
