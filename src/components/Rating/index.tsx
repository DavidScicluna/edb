import { ReactElement } from 'react';

import { useTheme, useColorMode, Center, VStack, Text } from '@chakra-ui/react';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import _ from 'lodash';

import { Theme } from '../../theme/types';
import SkeletonText from '../Skeleton/Text';
import { RatingProps } from './types';

const Rating = (props: RatingProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const { children, isLoading = false, size = 'md' } = props;

  /**
   * This method will return the appropriate font-size from theme depending on size prop
   *
   * @returns - string: Theme size
   */
  const handleReturnIconSize = (): string => {
    switch (size) {
      case 'sm':
        return theme.fontSizes.lg;
      case 'lg':
        return theme.fontSizes['2xl'];
      case 'xl':
        return theme.fontSizes['3xl'];
      default:
        return theme.fontSizes.xl;
    }
  };

  /**
   * This method will return the appropriate font-size from theme depending on size prop
   *
   * @returns - string: Theme size
   */
  // const handleReturnCountSize = (): string => {
  //   switch (size) {
  //     case 'sm':
  //       return 'xs';
  //     case 'lg':
  //       return 'sm';
  //     case 'xl':
  //       return 'sm';
  //     default:
  //       return 'xs';
  //   }
  // };

  return (
    <Center>
      <StarOutlinedIcon
        style={{
          color: theme.colors.yellow[colorMode === 'light' ? 400 : 500],
          fontSize: handleReturnIconSize()
        }}
      />
      <SkeletonText offsetY={8} isLoaded={!isLoading} ml={0.5}>
        <VStack spacing={0.25}>
          <Text
            color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
            fontSize={size}
            fontWeight='medium'
            lineHeight='normal'
          >
            {_.round(children) || 'N/A'}
          </Text>
          {/* TODO: Find a way to better display count */}
          {/* {count ? (
            <Text color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize={handleReturnCountSize()}>
              {count}
            </Text>
          ) : null} */}
        </VStack>
      </SkeletonText>
    </Center>
  );
};

export default Rating;
