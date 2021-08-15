import React, { ReactElement } from 'react';

import { useTheme, useColorMode, useMediaQuery, HStack, VStack, Link as CUILink, Text } from '@chakra-ui/react';
import moment from 'moment';

import useSelector from '../../../../../../../../../../common/hooks/useSelectorTyped';
import utils from '../../../../../../../../../../common/utils/utils';
import Link from '../../../../../../../../../../components/Clickable/Link';
import { Theme } from '../../../../../../../../../../theme/types';
import Badge from '../Badge';
import { MediaItemProps } from './types';

const MediaItem = (props: MediaItemProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 480px)');

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
            <CUILink
              align='left'
              color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
              fontSize={isSm ? 'sm' : 'md'}
              fontWeight='semibold'
              sx={{
                transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
              }}
              _hover={{ color: `${color}.400` }}>
              {`${title}  `}
              {!date ? (
                <Badge label='Announced' color={utils.handleReturnColor(color)} size={isSm ? 'xs' : 'sm'} />
              ) : date && handleIfDateIsFuture(date) ? (
                <Badge label='In Production' color={utils.handleReturnColor(color)} size={isSm ? 'xs' : 'sm'} />
              ) : null}
            </CUILink>
          </Link>
        </HStack>

        <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize={isSm ? 'xs' : 'sm'}>
          {subtitle}
        </Text>
      </VStack>

      {date ? (
        <Text align='right' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize={isSm ? 'xs' : 'sm'}>
          {utils.handleReturnDate(date || '', 'year')}
        </Text>
      ) : null}
    </HStack>
  );
};

export default MediaItem;
