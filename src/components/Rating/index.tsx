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
  const fontSize = useBreakpointValue({
    'base': theme.fontSizes['sm'],
    'sm': theme.fontSizes['sm'],
    'md': theme.fontSizes['md'],
    'lg': theme.fontSizes['lg'],
    'xl': theme.fontSizes['lg'],
    '2xl': theme.fontSizes['xl']
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
      <SkeletonText isLoaded={!isLoading} ml={0.5}>
        <Text
          color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
          fontSize={isHorizontal ? fontSize : 'md'}
          fontWeight='medium'
          sx={{ lineHeight: 'normal' }}>
          {rating.rating || 'N/A'}
        </Text>
      </SkeletonText>
    </Center>
  );
};

export default Rating;
