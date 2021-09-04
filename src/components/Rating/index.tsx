import React, { ReactElement } from 'react';

import {
  useTheme,
  useColorMode,
  useBreakpointValue,
  Center,
  Icon,
  Text
  // VStack,
  // CircularProgress,
  // CircularProgressLabel
} from '@chakra-ui/react';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import _ from 'lodash';

import { Theme } from '../../theme/types';
import SkeletonText from '../Skeleton/Text';
// import Tooltip from '../Tooltip';
import { RatingProps } from './types';

const defaultRating = {
  rating: null,
  count: null
};

const Rating = (props: RatingProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const { rating = defaultRating, isLoading = false, isHorizontal = false } = props;

  const iconSize = useBreakpointValue({
    'base': theme.fontSizes['lg'],
    'sm': theme.fontSizes['lg'],
    'md': theme.fontSizes['xl'],
    'lg': theme.fontSizes['2xl'],
    'xl': theme.fontSizes['2xl'],
    '2xl': theme.fontSizes['3xl']
  });

  return (
    <Center backgroundColor='transparent' p={0}>
      <Icon
        as={StarOutlinedIcon}
        color='yellow.400'
        sx={{
          fontSize: `${isHorizontal ? iconSize : theme.fontSizes.xl} !important`
        }}
      />
      <SkeletonText offsetY={8} isLoaded={!isLoading} ml={0.5}>
        <Text
          color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
          fontSize={isHorizontal ? ['sm', 'sm', 'md', 'lg', 'lg', 'xl'] : 'md'}
          fontWeight='medium'
          sx={{ lineHeight: 'normal' }}>
          {_.round(rating?.rating || 0, 1) || 'N/A'}
        </Text>
      </SkeletonText>
    </Center>
  );
};

export default Rating;
