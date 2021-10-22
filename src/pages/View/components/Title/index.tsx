import { ReactElement } from 'react';

import { useTheme, useColorMode, useBreakpointValue, HStack, VStack, Text, Badge, SlideFade } from '@chakra-ui/react';
import _ from 'lodash';

import {
  handleReturnDummyWidths,
  handleReturnDate,
  handleReturnNumberFromString,
  handleReturnRuntime
} from '../../../../common/utils';
import Rating from '../../../../components/Rating';
import SkeletonText from '../../../../components/Skeleton/Text';
import { Theme } from '../../../../theme/types';
import { TitleProps } from './types';

const dummyTextWidths = handleReturnDummyWidths(100, 3);

const Title = (props: TitleProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const offsetY = useBreakpointValue({
    'base': '12px',
    'sm': '12px',
    'md': '15px',
    'lg': '15px',
    'xl': '15px',
    '2xl': '15px'
  });
  const iconFontsize = useBreakpointValue({
    'base': theme.fontSizes['2xl'],
    'sm': theme.fontSizes['2xl'],
    'md': theme.fontSizes['3xl'],
    'lg': theme.fontSizes['3xl'],
    'xl': theme.fontSizes['3xl'],
    '2xl': theme.fontSizes['3xl']
  });

  const { mediaType, title, rating, date, certification, genres, runtime, isLoading = true } = props;

  return (
    <VStack alignItems='flex-start' wrap='wrap' spacing={isLoading ? 1 : 0}>
      <HStack spacing={0.75}>
        <SkeletonText offsetY={offsetY} isLoaded={!isLoading}>
          <Text
            align='left'
            color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
            fontSize={['2xl', '2xl', '3xl', '3xl', '3xl', '3xl']}
            fontWeight='bold'>
            {title || 'Movie Title'}{' '}
            <Badge height={['28px', '28px', '35px', '35px', '35px', '35px']} background='transparent' p={0}>
              <Rating
                rating={rating}
                isLoading={isLoading}
                iconFontsize={iconFontsize}
                textFontsize={['lg', 'lg', 'xl', 'xl', 'xl', 'xl']}
              />
            </Badge>
          </Text>
        </SkeletonText>
        <SlideFade in={isLoading} offsetY='10px' unmountOnExit>
          <Rating
            rating={{
              rating: 5.5,
              count: 0
            }}
            isLoading
            iconFontsize={iconFontsize}
            textFontsize={['lg', 'lg', 'xl', 'xl', 'xl', 'xl']}
          />
        </SlideFade>
      </HStack>
      <HStack
        spacing={isLoading ? 1 : 0}
        wrap='wrap'
        divider={
          <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm' mx={1}>
            •
          </Text>
        }>
        <SkeletonText offsetY={7} isLoaded={!isLoading}>
          <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm'>
            {handleReturnDate(date || '', 'full') || 'N/A'}
          </Text>
        </SkeletonText>

        {/* <SkeletonText offsetY={7} isLoaded={!isLoading}>
          <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm'>
            {certification && certification?.release_dates.length > 0 && certification?.release_dates[0].certification
              ? certification?.release_dates[0].certification
              : isLoading
              ? 'PG-13'
              : 'N/A'}
          </Text>
        </SkeletonText> */}

        <HStack
          wrap='wrap'
          spacing={isLoading ? 1 : 0}
          divider={
            <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm' pr={0.75}>
              ,
            </Text>
          }>
          {!isLoading && genres
            ? genres.map((genre, index) => (
                <SlideFade
                  key={index}
                  in
                  offsetY={7}
                  delay={handleReturnNumberFromString(theme.transition.duration['faster'], 'ms') / 250}>
                  <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm'>
                    {genre.name}
                  </Text>
                </SlideFade>
              ))
            : _.range(0, 2).map((_dummy, index) => (
                <SkeletonText
                  key={index}
                  width={`${dummyTextWidths[Math.floor(Math.random() * dummyTextWidths.length)]}px`}
                  height='19px'
                  offsetY={7}
                />
              ))}
        </HStack>

        {mediaType === 'movie' ? (
          <SkeletonText offsetY={7} isLoaded={!isLoading}>
            <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm'>
              {runtime ? handleReturnRuntime(runtime) : '1hr 15m'}
            </Text>
          </SkeletonText>
        ) : null}
      </HStack>
    </VStack>
  );
};

export default Title;
