import React, { ReactElement } from 'react';

import { useTheme, HStack, Icon, Text } from '@chakra-ui/react';

import useSelector from '../../../../../../common/hooks/useSelectorTyped';
import utils from '../../../../../../common/utils/utils';
import { Theme } from '../../../../../../theme/types';
import Card from '../../../../../Clickable/Card';
import { DisplayModeItemProps } from './types';

const DisplayModeItem = (props: DisplayModeItemProps): ReactElement => {
  const theme = useTheme<Theme>();

  const color = useSelector((state) => state.user.ui.theme.color);

  const { label, value, icon, isActive = false, onClick } = props;

  return (
    <Card
      color={isActive ? utils.handleReturnColor(color) : 'gray'}
      isFullWidth
      onClick={onClick ? () => onClick(value) : undefined}
      px={3}
      py={1.5}>
      <HStack width='100%' justifyContent='center' spacing={1}>
        <Icon as={icon} sx={{ fontSize: `${theme.fontSizes['2xl']} !important` }} />
        <Text align='center' fontSize='xl' fontWeight='semibold' textTransform='uppercase'>
          {label}
        </Text>
      </HStack>
    </Card>
  );
};

export default DisplayModeItem;
