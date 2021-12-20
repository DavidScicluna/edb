import { ReactElement } from 'react';

import { useColorMode, useMediaQuery, Text } from '@chakra-ui/react';

import { useSelector } from '../../../../common/hooks';
import Button from '../../../../components/Clickable/Button';
import Link from '../../../../components/Clickable/Link';
import HorizontalGrid from '../../../../components/Grid/Horizontal';
import { HomeHorizontalGridProps } from './types';

const HomeHorizontalGrid = (props: HomeHorizontalGridProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  const { children, title, pathname, isLoading = false } = props;

  return (
    <HorizontalGrid
      title={
        <Text
          align='left'
          color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
          fontSize={['xl', 'xl', '2xl', '2xl', '2xl', '2xl']}
          fontWeight='semibold'
          textTransform='capitalize'
        >
          {title}
        </Text>
      }
      footer={
        <Link to={{ pathname }} isFullWidth isDisabled={isLoading}>
          <Button color={color} isFullWidth isDisabled={isLoading} size={isSm ? 'sm' : 'md'} variant='text'>
            {`View all ${title}`}
          </Button>
        </Link>
      }
      isLoading={isLoading}
    >
      {children}
    </HorizontalGrid>
  );
};

export default HomeHorizontalGrid;
