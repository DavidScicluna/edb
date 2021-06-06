import React, { ReactElement } from 'react';

import { useTheme, useColorMode, VStack, Text, HStack, ScaleFade, Icon, Button } from '@chakra-ui/react';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import { useDispatch } from 'react-redux';

import useSelector from '../../../../../../../../../common/hooks/useSelectorTyped';
import { SortBy as SortByType } from '../../../../../../../../../common/types/types';
import { toggleSortDirection } from '../../../../../../../../../store/slices/app';
import { Theme } from '../../../../../../../../../theme/types';

type SortByProps = {
  sortBy: SortByType[];
  onSortChange: (sortBy: SortByType) => void;
};

const SortBy = ({ sortBy = [], onSortChange }: SortByProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const dispatch = useDispatch();
  const sortDirection = useSelector((state) => state.app.data.sortDirection);

  return (
    <VStack width='100%' alignItems='flex-start' justifyContent='center' spacing={1}>
      <Text
        width='100%'
        align='left'
        color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
        fontSize='md'
        fontWeight='semibold'>
        Sort by
      </Text>

      <VStack width='100%' alignItems='stretch' justifyContent='flex-start' spacing={0.5}>
        {sortBy.map((sort) => (
          <Button
            key={sort.value}
            isFullWidth
            onClick={() =>
              sort.isActive
                ? dispatch(toggleSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'))
                : onSortChange(sort)
            }
            px={1.25}
            py={0.75}
            sx={{
              'minWidth': '225px',

              'border': 'solid2',
              'borderRadius': 'base',
              'borderColor': sort.isActive ? 'blue.400' : 'transparent',
              'backgroundColor': sort.isActive ? 'blue.400' : 'transparent',

              'transition': `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}`,

              '&:hover': {
                'borderColor': sort.isActive ? 'blue.500' : 'transparent',
                'backgroundColor': sort.isActive ? 'blue.500' : 'transparent',

                '.chakra-text': {
                  color: sort.isActive ? (colorMode === 'light' ? 'gray.50' : 'gray.900') : 'blue.400'
                }
              },

              '&:focus': {
                borderColor: 'transparent',
                boxShadow: 'none'
              }
            }}>
            <HStack width='100%' justifyContent='space-between' spacing={2}>
              <Text
                align='left'
                color={
                  sort.isActive
                    ? colorMode === 'light'
                      ? 'gray.50'
                      : 'gray.900'
                    : colorMode === 'light'
                    ? 'gray.900'
                    : 'gray.50'
                }
                fontSize='sm'
                fontWeight='medium'
                sx={{ transition: `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']}` }}>
                {sort.label}
              </Text>

              <ScaleFade in={sort.isActive} unmountOnExit>
                <Icon
                  as={ArrowDownwardOutlinedIcon}
                  color={colorMode === 'light' ? 'gray.50' : 'gray.900'}
                  sx={{
                    fontSize: `${theme.fontSizes.lg} !important`,
                    transform: sortDirection === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: `${theme.transition.duration.normal} ${theme.transition.easing['ease-out']} !important`
                  }}
                />
              </ScaleFade>
            </HStack>
          </Button>
        ))}
      </VStack>
    </VStack>
  );
};

export default SortBy;
