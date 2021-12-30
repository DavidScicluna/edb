import { ReactElement } from 'react';

import { useTheme, Text, HStack } from '@chakra-ui/react';

import Card from '../../../../../../../../../components/Clickable/Card';
import { Theme } from '../../../../../../../../../theme/types';
import { BackgroundItemProps } from './types';

const BackgroundItem = (props: BackgroundItemProps): ReactElement => {
  const theme = useTheme<Theme>();

  const { label, value, icon: Icon, color, background, isActive = false, onClick } = props;

  return (
    <Card
      color={isActive ? color : 'gray'}
      colorMode={background}
      isClickable
      isFullWidth
      onClick={onClick ? () => onClick(value) : undefined}
      p={2}
    >
      <HStack width='100%' justifyContent='center' spacing={1}>
        <Icon style={{ fontSize: theme.fontSizes['2xl'] }} />
        <Text align='center' fontSize='xl' fontWeight='semibold' textTransform='uppercase'>
          {label}
        </Text>
      </HStack>
    </Card>
  );
};

export default BackgroundItem;
