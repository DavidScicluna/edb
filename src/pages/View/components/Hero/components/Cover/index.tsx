import { ReactElement } from 'react';

import { useMediaQuery, HStack, Box } from '@chakra-ui/react';


import { CoverProps } from './types';

const Cover = ({ children }: CoverProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  return isSm ? (
    children.poster
  ) : (
    <HStack width='100%' maxWidth='100%' spacing={2}>
      <Box width='25%' maxWidth='25%'>
        {children.poster}
      </Box>
      <Box width='75%' maxWidth='75%'>
        {children.backdrop}
      </Box>
    </HStack>
  );
};

export default Cover;
