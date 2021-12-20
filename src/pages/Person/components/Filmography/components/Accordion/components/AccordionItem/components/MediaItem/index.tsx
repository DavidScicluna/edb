import { ReactElement } from 'react';

import { useTheme, useColorMode, useMediaQuery, HStack, VStack, Text } from '@chakra-ui/react';
import moment from 'moment';

import { useSelector } from '../../../../../../../../../../common/hooks';
import { handleReturnDate } from '../../../../../../../../../../common/utils';
import Badge from '../../../../../../../../../../components/Badge';
import Link from '../../../../../../../../../../components/Clickable/Link';
import { Theme } from '../../../../../../../../../../theme/types';
import { MediaItemProps } from './types';

const MediaItem = (props: MediaItemProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  const { id, mediaType, title, subtitle, date } = props;

  /**
   * This method will check if the media item's date is in the future or its already passed
   *
   * @param date - String
   * @returns - Boolean if media item's date is in the future
   */
  const handleIfDateIsFuture = (date: string): boolean => {
    return moment(new Date()).isBefore(moment(date, 'YYYY-MM-DD'));
  };

  return (
    <HStack justifyContent='space-between' width='100%' spacing={2}>
      <VStack alignItems='flex-start' spacing={0}>
        <HStack spacing={2}>
          <Link to={{ pathname: `/${mediaType}/${id}` }}>
            <Text
              align='left'
              color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
              fontSize={isSm ? 'sm' : 'md'}
              fontWeight='semibold'
              sx={{
                transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
              }}
              _focus={{ boxShadow: 'none' }}
              _hover={{ color: `${color}.${colorMode === 'light' ? 500 : 400}` }}
            >
              {isSm ? `${title} ` : title}
              {!date ? (
                <Badge color={color} size={isSm ? 'xs' : 'sm'} ml={isSm ? 0 : 1}>
                  Announced
                </Badge>
              ) : date && handleIfDateIsFuture(date) ? (
                <Badge color={color} size={isSm ? 'xs' : 'sm'} ml={isSm ? 0 : 1}>
                  In Production
                </Badge>
              ) : null}
            </Text>
          </Link>
        </HStack>

        <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize={isSm ? 'xs' : 'sm'}>
          {subtitle}
        </Text>
      </VStack>

      {date ? (
        <Text align='right' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize={isSm ? 'xs' : 'sm'}>
          {handleReturnDate(date || '', 'year')}
        </Text>
      ) : null}
    </HStack>
  );
};

export default MediaItem;
