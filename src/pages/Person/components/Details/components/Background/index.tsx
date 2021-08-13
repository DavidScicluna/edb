import React, { ReactElement, useState, useCallback, useEffect } from 'react';

import { useTheme, Box } from '@chakra-ui/react';
import _ from 'lodash';
import { useLocation } from 'react-router-dom';

import { Theme } from '../../../../../../theme/types';
import { BackgroundProps } from './types';

const Background = ({ children }: BackgroundProps): ReactElement => {
  const theme = useTheme<Theme>();

  const location = useLocation();

  const [gradient, setGradient] = useState<string>();

  /**
   * This method will return 2 colors to be used in a gradient
   *
   * @returns String - Gradient colors
   */
  const handleReturnGradient = useCallback(
    _.debounce(() => {
      const random: number = Math.floor(Math.random() * 5);
      let gradient = '';

      switch (random) {
        case 0:
          gradient = 'red.400, pink.400';
          break;
        case 1:
          gradient = 'orange.400, yellow.400';
          break;
        case 2:
          gradient = 'green.400, teal.400';
          break;
        case 3:
          gradient = 'blue.400, cyan.400';
          break;
        default:
          gradient = 'purple.400, pink.400';
          break;
      }

      setGradient(gradient);
    }, 250),
    []
  );

  useEffect(() => handleReturnGradient(), [location]);

  return (
    <Box
      width='100%'
      height={['150px', '150px', '200px', '250px', '300px', '350px']}
      position='relative'
      bgGradient={`linear(to-r, ${gradient})`}
      borderRadius='md'>
      <Box position='absolute' top={theme.space[2]} right={theme.space[2]}>
        {children.socials}
      </Box>
      <Box
        position='absolute'
        bottom={['-37.5px', '-37.5px', '-50px', '-62.5px', '-75px', '-87.5px']}
        left={['37.5px', '37.5px', '50px', '62.5px', '75px', '87.5px']}>
        {children.poster}
      </Box>
    </Box>
  );
};

export default Background;
