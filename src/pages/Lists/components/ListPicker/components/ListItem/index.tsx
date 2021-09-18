import React, { ReactElement, useRef } from 'react';

import { useTheme, useColorMode, useBoolean, VStack, Text, Box } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import { useElementSize, useSelector } from '../../../../../../common/hooks';
import { handleReturnColor } from '../../../../../../common/utils';
import Card from '../../../../../../components/Clickable/Card';
import Link from '../../../../../../components/Clickable/Link';
import Radio from '../../../../../../components/Clickable/Radio';
import { Theme } from '../../../../../../theme/types';
import { ListItemProps } from './types';

const ListItem = (props: ListItemProps): ReactElement => {
  const listRef = useRef<HTMLDivElement | null>(null);

  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const location = useLocation();

  const { width } = useElementSize(listRef);

  const { id, label, results, isActive = false, isSelectable = false, isSelected = false, onSelected } = props;

  const color = useSelector((state) => state.user.ui.theme.color);

  const [isHoveringRadio, setIsHoveringRadio] = useBoolean();

  const movies = results.movies.length;
  const tv = results.tv.length;

  return (
    <Link isFullWidth isDisabled={isHoveringRadio} to={{ pathname: `/lists/${id}` }}>
      <Card
        height={`${width}px`}
        color={location.pathname.includes(id) || isSelected ? handleReturnColor(color) : 'gray'}
        isFullWidth
        isClickable={!isHoveringRadio}>
        <VStack position='relative' width='100%' spacing={0} px={2} py={6}>
          {isSelectable && onSelected ? (
            <Box position='absolute' top={theme.space[2]} left={theme.space[2]}>
              <Radio
                color={handleReturnColor(color)}
                isChecked={isSelected}
                onMouseEnter={() => setIsHoveringRadio.on()}
                onMouseLeave={() => setIsHoveringRadio.off()}
                onClick={() => onSelected(id)}
              />
            </Box>
          ) : null}
          <Text
            align='center'
            color={
              isActive || isSelected
                ? `${handleReturnColor(color)}.400`
                : colorMode === 'light'
                ? 'gray.900'
                : 'gray.50'
            }
            fontSize='md'
            fontWeight='semibold'
            textTransform='capitalize'
            sx={{ transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}` }}>
            {label}
          </Text>
          <Text
            align='center'
            color={
              isActive || isSelected
                ? `${handleReturnColor(color)}.400`
                : colorMode === 'light'
                ? 'gray.400'
                : 'gray.500'
            }
            fontSize='xs'
            fontWeight='400'
            textTransform='capitalize'
            sx={{ transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}` }}>
            {`${[
              `${movies} movie${movies === 0 || movies > 1 ? 's' : ''}`,
              `${tv} TV show${tv === 0 || tv > 1 ? 's' : ''}`
            ]
              .filter((item) => item)
              .join(' • ')}`}
          </Text>
        </VStack>
      </Card>
    </Link>
  );
};

export default ListItem;
