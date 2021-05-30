import React, { ReactElement } from 'react';

import {
  useColorMode,
  useTheme,
  Theme,
  Center,
  Icon,
  Text,
  VStack,
  CircularProgress,
  CircularProgressLabel
} from '@chakra-ui/react';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';

import { Rating as RatingType } from '../../common/types/types';
import SkeletonText from '../Skeleton/Text';
import Tooltip from '../Tooltip';

interface RatingProps {
  rating?: RatingType;
  isLoaded: boolean;
}

const defaultRating = {
  rating: null,
  count: null
};

const Rating = ({ rating = defaultRating, isLoaded = false }: RatingProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const handleRatingColor = (): 'red' | 'yellow' | 'blue' => {
    if (rating.rating) {
      if (rating.rating < 4) {
        return 'red';
      } else if (rating.rating < 7) {
        return 'yellow';
      } else {
        return 'blue';
      }
    } else return 'yellow';
  };

  return (
    <Tooltip
      aria-label='Showing rating information'
      label={
        <Center>
          <VStack spacing={1}>
            <CircularProgress
              color={`${handleRatingColor()}.400`}
              value={rating.rating ? rating.rating * 10 : 0}
              size='54px'>
              <CircularProgressLabel color={colorMode === 'light' ? 'gray.400' : 'gray.500'}>{`${
                rating.rating ? rating.rating * 10 : 'N/A'
              }%`}</CircularProgressLabel>
            </CircularProgress>
            {rating.count ? (
              <Text color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='md'>
                {rating.count}
              </Text>
            ) : null}
          </VStack>
        </Center>
      }
      placement='top'
      isDisabled={!rating.rating || !isLoaded}>
      <Center
        background='transparent'
        borderRadius='sm'
        border='solid2'
        borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
        py='0.5'
        px='1'>
        <Icon as={StarOutlinedIcon} color='yellow.400' sx={{ fontSize: `${theme.fontSizes.xl} !important` }} />
        <SkeletonText isLoaded={isLoaded} ml='0.5'>
          <Text color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize='sm' sx={{ lineHeight: 'normal' }}>
            {rating.rating || 'N/A'}
          </Text>
        </SkeletonText>
      </Center>
    </Tooltip>
  );
};

export default Rating;
