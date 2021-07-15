import React, { ReactElement } from 'react';

import { useTheme, Icon, Text, HStack } from '@chakra-ui/react';

import utils from '../../../../../../../../../common/utils/utils';
import Card from '../../../../../../../../../components/Clickable/Card';
import { Theme } from '../../../../../../../../../theme/types';
import { BackgroundItemProps } from './types';

const BackgroundItem = (props: BackgroundItemProps): ReactElement => {
  const theme = useTheme<Theme>();

  const { label, value, icon, color, background, isActive = false, onClick } = props;

  return (
    <Card
      color={isActive ? utils.handleReturnColor(color) : 'gray'}
      colorMode={background}
      isFullWidth
      onClick={onClick ? () => onClick(value) : undefined}
      p={2}>
      <HStack width='100%' justifyContent='center' spacing={1}>
        <Icon as={icon} sx={{ fontSize: `${theme.fontSizes['2xl']} !important` }} />
        <Text align='center' fontSize='xl' fontWeight='semibold' textTransform='uppercase'>
          {label}
        </Text>
      </HStack>
    </Card>
  );
};

export default BackgroundItem;
