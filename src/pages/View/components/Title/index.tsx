import { ReactElement } from 'react';

import { useColorMode, useMediaQuery, useBreakpointValue, VStack, Text } from '@chakra-ui/react';


import { TitleProps } from './types';

import HorizontalScroll from '../../../../components/HorizontalScroll';
import { FontSizes } from '../../../../theme/types';

const Title = (props: TitleProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const fontSize = useBreakpointValue<keyof FontSizes>({
    'base': '2xl',
    'sm': '2xl',
    'md': '3xl',
    'lg': '3xl',
    'xl': '3xl',
    '2xl': '3xl'
  });

  const { renderTitle, renderSubtitles, mediaType, isLoading } = props;

  return (
    <VStack width='100%' alignItems='flex-start' spacing={mediaType === 'person' ? (isLoading ? 0.5 : 0) : 1}>
      {renderTitle({
        color: colorMode === 'light' ? 'gray.900' : 'gray.50',
        fontSize: fontSize === '2xl' ? '2xl' : '3xl',
        fontWeight: 'bold'
      })}
      {renderSubtitles ? (
        <HorizontalScroll
          renderDivider={({ padding }) => (
            <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='md' px={padding}>
              •
            </Text>
          )}
          isDisabled={isLoading}
        >
          {renderSubtitles({
            color: colorMode === 'light' ? 'gray.400' : 'gray.500',
            fontSize: isSm ? 'xs' : 'sm'
          })}
        </HorizontalScroll>
      ) : null}
    </VStack>
  );
};

export default Title;
