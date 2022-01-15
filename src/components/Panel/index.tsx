import { ReactElement, isValidElement } from 'react';

import { useTheme, useColorMode, VStack, Box } from '@chakra-ui/react';
import _ from 'lodash';

import { ColorMode } from '../../common/types';
import { Theme, Space } from '../../theme/types';
import Body from './components/Body';
import Divider from './components/Divider';
import Footer from './components/Footer';
import Header from './components/Header';
import useStyles from './styles';
import { PanelProps } from './types';

const Panel = (props: PanelProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode: colorModeHook } = useColorMode();

  const {
    children,
    color = 'gray',
    colorMode: colorModeProp,
    isFullWidth = false,
    isDivisible = true,
    size = 'md',
    variant = 'outlined',
    ...rest
  } = props;

  const colorMode: ColorMode = colorModeProp || colorModeHook;

  const style = useStyles(theme, { color, isFullWidth });

  /**
   * This method will return the appropriate spacing depending on the size passed
   *
   * @returns - number: Spacing value
   */
  const handleReturnSpacing = (): keyof Space => {
    switch (size) {
      case 'xs':
        return 1;
      case 'sm':
        return 1.5;
      case 'lg':
        return 2.5;
      case 'xl':
        return 3;
      default:
        return 2;
    }
  };

  /**
   * This method will return the appropriate padding depending on the size passed
   *
   * @returns - number: Padding value
   */
  const handleReturnPadding = (): keyof Space => {
    switch (size) {
      case 'xs':
        return 1;
      case 'sm':
        return 1.5;
      case 'lg':
        return 2.5;
      case 'xl':
        return 3;
      default:
        return 2;
    }
  };

  return (
    <VStack
      {...rest}
      divider={isDivisible ? <Divider colorMode={colorMode} /> : undefined}
      p={handleReturnPadding()}
      spacing={isDivisible ? handleReturnSpacing() : 0}
      sx={{ ..._.merge(style.panel[variant], style[colorMode][variant][size], style[colorMode][variant]) }}
    >
      {children.header ? (
        !isValidElement(children.header) && (!_.isNil(children.header?.title) || !_.isNil(children.header?.actions)) ? (
          <Header actions={children.header?.actions} colorMode={colorMode} title={children.header?.title} size={size} />
        ) : (
          <Box width='100%' pb={handleReturnPadding()}>
            {children.header}
          </Box>
        )
      ) : null}

      <Body hasHeader={!_.isNil(children.header)} hasFooter={!_.isNil(children.footer)} size={size}>
        {children.body}
      </Body>

      {children.footer ? <Footer size={size}>{children.footer}</Footer> : null}
    </VStack>
  );
};

export default Panel;
