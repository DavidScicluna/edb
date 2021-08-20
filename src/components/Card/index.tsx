import React, { ReactElement } from 'react';

import { useColorMode, Box, VStack } from '@chakra-ui/react';
import _ from 'lodash';

import { ColorMode } from '../../common/types/types';
import Divider from './components/Divider';
import Footer from './components/Footer';
import Header from './components/Header';
import useStyles from './styles';
import { CardProps } from './types';

const Card = (props: CardProps): ReactElement => {
  const { colorMode } = useColorMode();

  const {
    children,
    box,
    color,
    colorMode: colorModeProp,
    isFullWidth,
    hasDivider = true,
    variant = 'outlined',
    ...rest
  } = props;

  const style = useStyles(color, isFullWidth);

  const mode: ColorMode = colorModeProp || colorMode;

  return (
    <VStack
      {...rest}
      divider={hasDivider ? <Divider colorMode={mode} /> : undefined}
      spacing={0}
      sx={{ ..._.merge(style.card, style[mode][variant]) }}>
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
