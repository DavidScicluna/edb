import { handleReturnNumberFromString } from '../../../../common/utils';
import theme from '../../../../theme';

export default {
  speed: handleReturnNumberFromString(theme.transition.duration['slower'], 'ms') / 750
};
