import { ReactElement } from 'react';

import { useColorMode, Center, Icon, Text } from '@chakra-ui/react';
import _ from 'lodash';
import { Star as StarIcon } from 'react-feather';

import SkeletonText from '../Skeleton/Text';
import { RatingProps } from './types';

const defaultRating = {
  rating: null,
  count: null
};

// TODO: Refactor to use new Badge
const Rating = (props: RatingProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { rating = defaultRating, isLoading = false, iconFontsize, textFontsize } = props;

  return (
    <Center backgroundColor='transparent' p={0}>
      <Icon
        as={StarIcon}
        color='yellow.400'
        sx={{
          fontSize: `${iconFontsize} !important`
        }}
      />
      <SkeletonText offsetY={8} isLoaded={!isLoading} ml={0.5}>
        <Text
          color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
          fontSize={textFontsize}
          fontWeight='medium'
          sx={{ lineHeight: 'normal' }}
        >
          {_.round(rating?.rating || 0, 1) || 'N/A'}
        </Text>
      </SkeletonText>
    </Center>
  );
};

export default Rating;
