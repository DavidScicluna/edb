import React, { ReactElement } from 'react';

import { useColorMode, VStack, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import useSelector from '../../../../../../common/hooks/useSelectorTyped';
import utils from '../../../../../../common/utils/utils';
import Card from '../../../../../../components/Clickable/Card';
import { ListItemProps } from './types';

const ListItem = (props: ListItemProps): ReactElement => {
  const { colorMode } = useColorMode();

  const location = useLocation();

  const { id, label, results, isActive = false, onClick } = props;

  const color = useSelector((state) => state.user.ui.theme.color);

  const movies = results.movies.length;
  const tv = results.tv.length;

  return (
    <Card
      color={location.pathname.includes(id) ? utils.handleReturnColor(color) : 'gray'}
      onClick={!isActive && onClick ? () => onClick(id) : undefined}
      variant='outlined'
      p={4}>
      <VStack spacing={0}>
        <Text
          align='center'
          color={isActive ? `${utils.handleReturnColor(color)}.400` : colorMode === 'light' ? 'gray.900' : 'gray.50'}
          fontSize='md'
          fontWeight='semibold'
          textTransform='capitalize'>
          {label}
        </Text>
        <Text
          align='center'
          color={isActive ? `${utils.handleReturnColor(color)}.400` : colorMode === 'light' ? 'gray.400' : 'gray.500'}
          fontSize='xs'
          fontWeight='400'
          textTransform='capitalize'>
          {`${[
            `${movies} movie${movies === 0 || movies > 1 ? 's' : ''}`,
            `${tv} TV show${tv === 0 || tv > 1 ? 's' : ''}`
          ].join(' • ')}`}
        </Text>
      </VStack>
    </Card>
  );
};

export default ListItem;
