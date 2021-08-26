import React, { ReactElement } from 'react';

import { useColorMode, useBreakpointValue, VStack, Image, Text, Fade } from '@chakra-ui/react';

import * as error from '../../common/assets/illustrations/error';
import { useSelector } from '../../common/hooks';
import Card from '../Card';
import { ErrorProps } from './types';

const Error = (props: ErrorProps): ReactElement => {
  const { colorMode } = useColorMode();
  const maxWidth = useBreakpointValue({
    'base': '75%',
    'sm': '75%',
    'md': '50%',
    'lg': '50%',
    'xl': '30%',
    '2xl': '30%'
  });

  const {
    button = undefined,
    hasIllustration = true,
    label,
    description,
    size = 'md',
    variant = 'transparent'
  } = props;

  const color = useSelector((state) => state.user.ui.theme.color);

  /**
   * This method will return the appropriate padding for the size passed
   *
   * @returns - Padding in rem from theme
   */
  const handleReturnPadding = (): number => {
    if (hasIllustration) {
      switch (size) {
        case 'xs':
          return 1;
        case 'sm':
          return 1.5;
        case 'lg':
          return 4;
        case 'xl':
          return 6;
        default:
          return 3;
      }
    } else {
      switch (size) {
        case 'xs':
          return 1;
        case 'sm':
          return 2;
        case 'lg':
          return 6;
        case 'xl':
          return 8;
        default:
          return 4;
      }
    }
  };

  /**
   * This method will return the appropriate Illustration depending on the color selected
   * @returns Illustration path
   */
  const handleReturnIllustration = (): string => {
    switch (color) {
      case 'blue':
        return error.default.blue;
      case 'cyan':
        return error.default.cyan;
      case 'green':
        return error.default.green;
      case 'orange':
        return error.default.orange;
      case 'pink':
        return error.default.pink;
      case 'purple':
        return error.default.purple;
      case 'teal':
        return error.default.teal;
      case 'yellow':
        return error.default.yellow;
      default:
        return '';
    }
  };

  return (
    <Fade in style={{ width: '100%' }}>
      <Card isFullWidth variant={variant} p={handleReturnPadding()}>
        {{
          body: (
            <VStack width='100%' spacing={2}>
              {hasIllustration ? (
                <Image maxWidth={maxWidth} alt='Error illustration' src={handleReturnIllustration()} />
              ) : null}
              {label || description ? (
                <VStack spacing={0}>
                  {label ? (
                    <Text
                      align='center'
                      fontSize='md'
                      fontWeight='semibold'
                      color={colorMode === 'light' ? 'gray.900' : 'gray.50'}>
                      {label}
                    </Text>
                  ) : null}
                  {description ? (
                    <Text align='center' fontSize='xs' color={colorMode === 'light' ? 'gray.400' : 'gray.500'}>
                      {description}
                    </Text>
                  ) : null}
                </VStack>
              ) : null}
              {button || null}
            </VStack>
          )
        }}
      </Card>
    </Fade>
  );
};

export default Error;
