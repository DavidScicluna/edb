import { ReactElement } from 'react';

import { useColorMode, useMediaQuery, Center, HStack, Box, VStack } from '@chakra-ui/react';
import { useElementSize } from 'usehooks-ts';

import { useSelector } from '../../common/hooks';
import { headerHeight } from '../../containers/Layout/common/data/dimensions';
import Code from './components/Code';
import Description from './components/Description';
import { ErrorProps } from './types';

const Error = (props: ErrorProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  const [descriptionRef, { height }] = useElementSize();

  const { code = 404, title, subtitle, renderActions } = props;

  return (
    <Center width='100%' minHeight={`calc(100vh - ${headerHeight + 32}px)`}>
      <VStack spacing={4} p={isSm ? 2 : 4}>
        {isSm ? (
          <VStack alignItems='flex-start' spacing={1}>
            <Code code={code} />
            <Box width='100%' height='2px' backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.700'} />
            <Description title={title} subtitle={subtitle} />
          </VStack>
        ) : (
          <HStack spacing={2}>
            <Code code={code} />
            <Box width='2px' height={height} backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.700'} />
            <Description ref={descriptionRef} title={title} subtitle={subtitle} />
          </HStack>
        )}

        {renderActions ? (
          <HStack alignItems='flex-start' spacing={2}>
            {renderActions({ color, colorMode, size: 'md' })}
          </HStack>
        ) : null}
      </VStack>
    </Center>
  );
};

export default Error;
