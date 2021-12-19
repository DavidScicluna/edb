import { handleConvertStringToNumber } from '../../../../common/utils';
import theme from '../../../../theme';

export default {
  speed: handleConvertStringToNumber(theme.transition.duration['slower'], 'ms') / 750
};
