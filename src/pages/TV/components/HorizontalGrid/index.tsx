import React, { ReactElement } from 'react';

import { useColorMode, useMediaQuery, Box, Text, Fade } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';

import { useSelector } from '../../../../common/hooks';
import { handleReturnColor } from '../../../../common/utils';
import Button from '../../../../components/Clickable/Button';
import Link from '../../../../components/Clickable/Link';
import HorizontalGrid from '../../../../components/Grid/Horizontal';
import HorizontalTV from '../HorizontalTV';
import { HomeHorizontalGridProps } from './types';

const HomeHorizontalGrid = (props: HomeHorizontalGridProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 1
  });

  const { tv, title, pathname, isLoading = true, isError = false, isSuccess = false } = props;

  return (
    <Box ref={ref} width='100%' maxWidth='100%'>
      <Fade in={isLoading || inView} unmountOnExit style={{ width: 'inherit' }}>
        <HorizontalGrid
          title={
            <Text
              align='left'
              color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
              fontSize={['xl', 'xl', '2xl', '2xl', '2xl', '2xl']}
              fontWeight='semibold'
              textTransform='capitalize'>
              {title}
            </Text>
          }
          footer={
            <Link to={{ pathname }} isFullWidth isDisabled={isLoading}>
              <Button
                color={handleReturnColor(color)}
                isFullWidth
                isDisabled={isLoading}
                size={isSm ? 'sm' : 'md'}
                variant='text'>
                {`View all ${title}`}
              </Button>
            </Link>
          }
          isLoading={isLoading}>
          <HorizontalTV isError={isError} isSuccess={isSuccess} isLoading={isLoading} tv={tv} />
        </HorizontalGrid>
      </Fade>
    </Box>
  );
};

export default HomeHorizontalGrid;
