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

const Rating = ({ rating = defaultRating, isLoaded = false }: RatingProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const iconSize = useBreakpointValue({
    'base': theme.fontSizes['xl'],
    'sm': theme.fontSizes['xl'],
    'md': theme.fontSizes['2xl'],
    'lg': theme.fontSizes['2xl'],
    'xl': theme.fontSizes['2xl'],
    '2xl': theme.fontSizes['3xl']
  });

  // const handleRatingColor = (): 'red' | 'yellow' | 'blue' => {
  //   if (rating.rating) {
  //     if (rating.rating < 4) {
  //       return 'red';
  //     } else if (rating.rating < 7) {
  //       return 'yellow';
  //     } else {
  //       return 'blue';
  //     }
  //   } else return 'yellow';
  // };

  return (
    // <Tooltip
    //   aria-label='Showing rating information'
    //   label={
    //     <Center>
    //       <VStack spacing={1}>
    //         <CircularProgress
    //           color={`${handleRatingColor()}.400`}
    //           value={rating.rating ? rating.rating * 10 : 0}
    //           size='54px'>
    //           <CircularProgressLabel color={colorMode === 'light' ? 'gray.400' : 'gray.500'}>{`${
    //             rating.rating ? rating.rating * 10 : 'N/A'
    //           }%`}</CircularProgressLabel>
    //         </CircularProgress>
    //         {rating.count ? (
    //           <Text color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='md'>
    //             {rating.count}
    //           </Text>
    //         ) : null}
    //       </VStack>
    //     </Center>
    //   }
    //   placement='top'
    //   isDisabled={!rating.rating || !isLoaded}>
    <Center
      backgroundColor='transparent'
      // borderRadius='sm'
      // border='solid2'
      // borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      // py='0.5'
      // px='1'
      p={0}>
      <Icon
        as={StarOutlinedIcon}
        color='yellow.400'
        sx={{
          fontSize: `${iconSize} !important`
        }}
      />
      <SkeletonText isLoaded={isLoaded} ml='0.5'>
        <Text
          color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
          fontSize={['sm', 'sm', 'md', 'md', 'md', 'lg']}
          fontWeight='medium'
          sx={{ lineHeight: 'normal' }}>
          {rating.rating || 'N/A'}
        </Text>
      </SkeletonText>
    </Center>
    // </Tooltip>
  );
};

export default Rating;
