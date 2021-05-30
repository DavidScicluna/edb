import utils from '../../../../common/utils/utils';
import theme from '../../../../theme';

export default {
  fadeDuration: utils.handleReturnNumberFromString(theme.transition.duration['normal'], 'ms') / 1000,
  speed: utils.handleReturnNumberFromString(theme.transition.duration['slower'], 'ms') / 1000
};
