import React, { ReactElement, useState } from 'react';

import { useTheme, useColorMode, VStack, Text, Box } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import useSelector from '../../../../../../common/hooks/useSelectorTyped';
import utils from '../../../../../../common/utils/utils';
import Card from '../../../../../../components/Clickable/Card';
import Radio from '../../../../../../components/Clickable/Radio';
import { Theme } from '../../../../../../theme/types';
import { ListItemProps } from './types';

const ListItem = (props: ListItemProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const location = useLocation();

  const { id, label, results, isActive = false, isSelectable = false, isSelected = false, onSelected, onClick } = props;

  const color = useSelector((state) => state.user.ui.theme.color);

  const [isHoveringCheckbox, setIsHoveringCheckbox] = useState<boolean>(false);

  const movies = results.movies.length;
  const tv = results.tv.length;

  return (
    <Box width='100%'>
      <Card
        flex={1}
        color={location.pathname.includes(id) ? utils.handleReturnColor(color) : 'gray'}
        onClick={!isActive && !isHoveringCheckbox && onClick ? () => onClick(id) : undefined}>
        <VStack width='100%' spacing={0} sx={{ position: 'relative' }} px={2} py={6}>
          {isSelectable && onSelected ? (
            <Box position='absolute' top={theme.space[2]} left={theme.space[2]}>
              <Radio
                color={utils.handleReturnColor(color)}
                isChecked={isSelected}
                onMouseEnter={() => setIsHoveringCheckbox(true)}
                onMouseLeave={() => setIsHoveringCheckbox(false)}
                onClick={() => onSelected(id)}
                size='lg'
              />
            </Box>
          ) : null}
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
    </Box>
  );
};

export default ListItem;
