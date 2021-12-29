import { ReactElement } from 'react';

import { ColorMode, useTheme, useColorMode, Button as CUIButton } from '@chakra-ui/react';
import _ from 'lodash';

import { Theme } from '../../../../../../../../../theme/types';
import useStyles from './styles';
import { DayProps } from './types';

const Day = (props: DayProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode: colorModeHook } = useColorMode();

  const { children, color = 'gray', colorMode: colorModeProp, variant = 'contained', ...rest } = props;

  const colorMode: ColorMode = colorModeProp || colorModeHook;

  const style = useStyles(theme, { color });

  return (
    <CUIButton
      {...rest}
      tabIndex={0}
      variant='unstyled'
      sx={{
        ..._.merge(style.day.default, style[colorMode][variant])
      }}
      _disabled={{
        ..._.merge(style.day.disabled, style[colorMode].disabled[variant])
      }}
    >
      <span style={{ opacity: children ? 1 : 0 }}>{children || '#'}</span>
    </CUIButton>
  );
};

export default Day;
