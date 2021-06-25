import React, { ReactElement } from 'react';

import { useTheme, useColorMode, Text, HStack, ScaleFade, Icon, Button } from '@chakra-ui/react';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import _ from 'lodash';

import { Theme } from '../../../../../../theme/types';
import useStyles from './styles';
import { SortByItemProps } from './types';

const SortByItem = ({
  label,
  value,
  isActive,
  direction,
  onSortChange,
  onDirectionChange
}: SortByItemProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const style = useStyles(theme, isActive);

  return (
    <Button
      isFullWidth
      onClick={() =>
        isActive ? onDirectionChange(direction === 'asc' ? 'desc' : 'asc') : onSortChange({ label, value, isActive })
      }
      px={2}
      py={1}
      sx={{ ..._.merge(style.common, style[colorMode]) }}>
      <HStack width='100%' justifyContent='space-between' spacing={2}>
        <Text align='left' fontSize='md' fontWeight='medium'>
          {label}
        </Text>

        <ScaleFade in={isActive} unmountOnExit>
          <Icon
            as={ArrowDownwardOutlinedIcon}
            sx={{
              transform: direction === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)'
            }}
          />
        </ScaleFade>
      </HStack>
    </Button>
  );
};

export default SortByItem;
