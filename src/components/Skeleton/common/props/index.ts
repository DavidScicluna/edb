import utils from '../../../../common/utils/utils';
import theme from '../../../../theme';

export default {
  speed: utils.handleReturnNumberFromString(theme.transition.duration['slower'], 'ms') / 750
};
