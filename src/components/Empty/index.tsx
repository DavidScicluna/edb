import { ReactElement } from 'react';

import { useColorMode, useBreakpointValue, VStack, Image, Text, Fade } from '@chakra-ui/react';

import * as empty from '../../common/assets/illustrations/empty';
import { useSelector } from '../../common/hooks';
import Card from '../Card';
import { EmptyProps } from './types';

const Empty = (props: EmptyProps): ReactElement => {
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
          return 2;
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
      <Card isFullWidth variant={variant} p={handleReturnPadding()}>
        {{
          body: (
            <VStack width='100%' spacing={2}>
              {hasIllustration ? (
                <Image maxWidth={maxWidth} alt='Empty illustration' src={handleReturnIllustration()} />
              ) : null}
              {label || description ? (
                <VStack spacing={0}>
                  {label ? (
                    <Text
                      align='center'
                      fontSize='md'
                      fontWeight='semibold'
                      color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
                    >
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

export default Empty;
