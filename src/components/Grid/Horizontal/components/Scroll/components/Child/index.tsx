import { ReactElement } from 'react';

import { Box } from '@chakra-ui/react';

import { ChildProps } from './types';

const Child = ({ children, isLast = false }: ChildProps): ReactElement => {
  return <Box mr={!isLast ? 2 : 0}>{children}</Box>;
};

export default Child;
