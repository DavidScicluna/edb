import { Style } from '../../../../common/types/types';
import { Theme } from '../../../../theme/types';

export default (theme: Theme): Style => ({
  width: '100vh',
  height: '100vw',
  maxHeight: '100vh',
  maxWidth: '100vw',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  padding: theme.space[2]
});
