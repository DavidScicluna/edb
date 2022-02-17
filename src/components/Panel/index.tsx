
import { ReactElement, createContext, isValidElement } from 'react';

import { ColorMode, useTheme, useColorMode, VStack, Box } from '@chakra-ui/react';

import _ from 'lodash';

import { handleReturnPadding } from './common/utils';
import Body from './components/Body';
import Footer from './components/Footer';
import Header from './components/Header';
import useStyles from './styles';
import { Context, PanelProps } from './types';

import { Theme } from '../../theme/types';
import Divider from '../Divider';

export const PanelContext = createContext<Context>({ size: 'md', variant: 'outlined' });

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

  return (
    <PanelContext.Provider value={{ size, variant }}>
      <VStack
        {...rest}
        divider={isDivisible ? <Divider colorMode={colorMode} /> : undefined}
        p={variant === 'outlined' ? handleReturnPadding(size, variant) : 0}
        spacing={0}
        sx={{ ..._.merge(style.panel[variant], style[colorMode][variant]) }}
      >
        {children.header ? (
          !isValidElement(children.header) &&
          (!_.isNil(children.header?.title) || !_.isNil(children.header?.actions)) ? (
            <Header actions={children.header?.actions} colorMode={colorMode} title={children.header?.title} />
          ) : (
            <Box width='100%' pb={handleReturnPadding(size, variant)}>
              {children.header}
            </Box>
          )
        ) : null}

        <Body hasHeader={!_.isNil(children.header)} hasFooter={!_.isNil(children.footer)}>
          {children.body}
        </Body>

        {children.footer ? <Footer>{children.footer}</Footer> : null}
      </VStack>
    </PanelContext.Provider>
  );
};

export default Panel;
