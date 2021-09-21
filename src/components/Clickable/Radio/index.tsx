import { ReactElement } from 'react';

import { useTheme, useColorMode, Radio as CUIRadio } from '@chakra-ui/react';
import _ from 'lodash';

import { ColorMode } from '../../../common/types/types';
import { Theme } from '../../../theme/types';
import useStyles from './styles';
import { RadioProps } from './types';

const Radio = (props: RadioProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const style = useStyles(theme, props);

  const { colorMode: colorModeProp, ...rest } = props;

  const mode: ColorMode = colorModeProp || colorMode;

  return <CUIRadio {...rest} sx={{ ..._.merge(style.radio, style[mode]) }} />;
};

export default Radio;
