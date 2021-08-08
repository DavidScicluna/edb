import React, { ReactElement } from 'react';

import { useTheme, Box } from '@chakra-ui/react';

import { Theme } from '../../../../../../theme/types';
import { BackgroundProps } from './types';

/**
 * This method will return 2 colors to be used in a gradient
 *
 * @returns String - Gradient colors
 */
const handleReturnGradient = (): string => {
  const random: number = Math.floor(Math.random() * 4);

  switch (random) {
    case 0:
      return 'red.400, pink.400';
    case 1:
      return 'orange.400, yellow.400';
    case 2:
      return 'green.400, teal.400';
    case 3:
      return 'blue.400, cyan.400';
    default:
      return 'purple.400, pink.400';
  }
};

const gradient = handleReturnGradient();

const Background = ({ children }: BackgroundProps): ReactElement => {
  const theme = useTheme<Theme>();

  return (
    <Box
      width='100%'
      height={['20vh', '22.5vh', '25vh', '27.5vh', '30vh', '35vh']}
      position='relative'
      bgGradient={`linear(to-r, ${gradient})`}
      borderRadius='md'>
      <Box position='absolute' top={theme.space[2]} right={theme.space[2]}>
        {children.socials}
      </Box>
      <Box position='absolute' bottom='-5vw' left='2.5vw'>
        {children.poster}
      </Box>
    </Box>
  );
};

export default Background;
