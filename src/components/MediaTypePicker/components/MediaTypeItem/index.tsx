import React, { ReactElement } from 'react';

import { useTheme, VStack, Icon, Text } from '@chakra-ui/react';

import { useSelector } from '../../../../common/hooks';
import utils from '../../../../common/utils/utils';
import Card from '../../../../components/Clickable/Card';
import { Theme } from '../../../../theme/types';
import { MediaTypeItemProps } from './types';

const MediaTypeItem = (props: MediaTypeItemProps): ReactElement => {
  const theme = useTheme<Theme>();

  const color = useSelector((state) => state.user.ui.theme.color);

  const { label, value, iconActive, icon, isActive = false, onClick } = props;

  return (
    <Card
      color={isActive ? utils.handleReturnColor(color) : 'gray'}
      isFullWidth
      onClick={() => onClick(value)}
      px={2}
      py={6}>
      <VStack width='100%' spacing={0}>
        <Icon as={isActive ? iconActive : icon} sx={{ fontSize: `${theme.fontSizes['3xl']} !important` }} />
        <Text align='center' fontSize='xl' fontWeight='semibold' textTransform='uppercase'>
          {label}
        </Text>
      </VStack>
    </Card>
  );
};

export default MediaTypeItem;
