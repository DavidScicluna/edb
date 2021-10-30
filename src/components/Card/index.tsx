import { ReactElement } from 'react';

import { useTheme, useColorMode, Box, VStack } from '@chakra-ui/react';
import _ from 'lodash';

import { ColorMode } from '../../common/types/types';
import { Theme } from '../../theme/types';
import Divider from './components/Divider';
import Footer from './components/Footer';
import Header from './components/Header';
import useStyles from './styles';
import { CardProps } from './types';

const Card = (props: CardProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const {
    children,
    box,
    colorMode: colorModeProp,
    hasDivider = true,
    variant = 'outlined',
    ...rest
  } = _.omit(props, ['color', 'isFullWidth']);

  const style = useStyles(theme, props);

  const mode: ColorMode = colorModeProp || colorMode;

  return (
    <VStack
      {...rest}
      divider={hasDivider ? <Divider colorMode={mode} /> : undefined}
      spacing={0}
      sx={{ ..._.merge(style.card[variant], style[mode][variant]) }}>
      {children.header?.title || children.header?.actions ? (
        <Header {...box?.header} actions={children.header.actions} colorMode={mode} title={children.header.title} />
      ) : null}

      <Box {...box?.body} width='100%'>
        {children.body}
      </Box>

      {children.footer ? <Footer {...box?.footer} footer={children.footer} /> : null}
    </VStack>
  );
};

export default Card;
