import React, { ReactElement } from 'react';

import { useTheme, useColorMode, useBreakpointValue, HStack, Center, VStack, Box, Text } from '@chakra-ui/react';
import _ from 'lodash';

import { useSelector } from '../../../../common/hooks';
import utils from '../../../../common/utils/utils';
import Link from '../../../../components/Clickable/Link';
import HorizontalScroll from '../../../../components/HorizontalScroll';
import Rating from '../../../../components/Rating';
import SkeletonText from '../../../../components/Skeleton/Text';
import { Theme } from '../../../../theme/types';
import { TitleProps } from './types';

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

  const color = useSelector((state) => state.user.ui.theme.color);

  const { title, rating, release_date, certification, genres, runtime, isLoading = true, isError = true } = props;

  return (
    <VStack alignItems='flex-start' spacing={isLoading || isError ? 1 : 0}>
      <HStack
      // spacing={isLoading ? 1 : 0}
      // divider={
      //   <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm' mx={1}>
      //     •
      //   </Text>
      // }
      >
        <SkeletonText offsetY={offsetY} isLoaded={!isLoading && !isError}>
          <Text
            align='left'
            color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
            fontSize={['2xl', '2xl', '3xl', '3xl', '3xl', '3xl']}
            fontWeight='bold'>
            {title || 'Movie title'}
          </Text>
        </SkeletonText>
        <Rating
          rating={rating}
          isLoading={isLoading}
          iconFontsize={iconFontsize}
          textFontsize={['lg', 'lg', 'xl', 'xl', 'xl', 'xl']}
        />
      </HStack>
      <HStack
        spacing={isLoading ? 1 : 0}
        wrap='wrap'
        divider={
          <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm' mx={1}>
            •
          </Text>
        }>
        <SkeletonText offsetY={7} isLoaded={!isLoading && !isError}>
          <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm'>
            {utils.handleReturnDate(release_date || '', 'year') || 2021}
          </Text>
        </SkeletonText>

        <SkeletonText offsetY={7} isLoaded={!isLoading && !isError}>
          <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm'>
            {!isLoading && !isError
              ? certification && certification?.release_dates.length > 0
                ? certification?.release_dates[0].certification
                : 'N/A'
              : 'PG-13'}
          </Text>
        </SkeletonText>

        <HStack
          divider={
            <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm' pr={0.75}>
              ,
            </Text>
          }>
          {[...(!isLoading || !isError ? genres || [] : _.range(3))]?.map((genre, index) => (
            <SkeletonText key={index} offsetY={7} isLoaded={!isLoading && !isError}>
              <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm'>
                {!isLoading && !isError && typeof genre !== 'number' ? genre.name : 'Lorem'}
              </Text>
            </SkeletonText>
          ))}
        </HStack>

        <SkeletonText offsetY={7} isLoaded={!isLoading && !isError}>
          <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm'>
            {runtime ? utils.handleReturnRuntime(runtime) : '1hr 15m'}
          </Text>
        </SkeletonText>
      </HStack>
    </VStack>
  );
};

export default Title;
