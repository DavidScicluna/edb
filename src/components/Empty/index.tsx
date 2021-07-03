import React, { ReactElement } from 'react';

import { useColorMode, VStack, Image, Text, Fade } from '@chakra-ui/react';

import * as empty from '../../common/assets/illustrations/empty';
import useSelector from '../../common/hooks/useSelectorTyped';
import { EmptyProps } from './types';

const Empty = (props: EmptyProps): ReactElement => {
  const { colorMode } = useColorMode();

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
        return empty.default.blue;
      case 'cyan':
        return empty.default.cyan;
      case 'green':
        return empty.default.green;
      case 'orange':
        return empty.default.orange;
      case 'pink':
        return empty.default.pink;
      case 'purple':
        return empty.default.purple;
      case 'teal':
        return empty.default.teal;
      case 'yellow':
        return empty.default.yellow;
      default:
        return '';
    }
  };

  return (
    <Fade in style={{ width: '100%' }}>
      <VStack
        width='100%'
        backgroundColor='transparent'
        borderRadius='lg'
        border='solid2'
        borderColor={variant === 'outlined' ? (colorMode === 'light' ? 'gray.200' : 'gray.700') : 'transparent'}
        spacing={2}
        p={handleReturnPadding()}>
        {hasIllustration ? <Image maxWidth='40%' alt='Empty illustration' src={handleReturnIllustration()} /> : null}
        <VStack spacing={0}>
          <Text
            align='center'
            fontSize='md'
            fontWeight='semibold'
            color={colorMode === 'light' ? 'gray.900' : 'gray.50'}>
            {label}
          </Text>
          {description ? (
            <Text align='center' fontSize='sm' color={colorMode === 'light' ? 'gray.400' : 'gray.500'}>
              {description}
            </Text>
          ) : null}
        </VStack>
        {button || null}
      </VStack>
    </Fade>
  );
};

export default Empty;
