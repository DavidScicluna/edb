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
   */
  const handleReturnGradient = useCallback(
    _.debounce(() => {
      const random: number = Math.floor(Math.random() * 9);
      let gradient = '';

      switch (random) {
        case 0:
          gradient = 'red.200, red.500';
          break;
        case 1:
          gradient = 'orange.200, orange.500';
          break;
        case 2:
          gradient = 'yellow.200, yellow.500';
          break;
        case 3:
          gradient = 'green.200, green.500';
          break;
        case 4:
          gradient = 'teal.200, teal.500';
          break;
        case 5:
          gradient = 'blue.200, blue.500';
          break;
        case 6:
          gradient = 'cyan.200, cyan.500';
          break;
        case 7:
          gradient = 'purple.200, purple.500';
          break;
        default:
          gradient = 'pink.200, pink.500';
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
