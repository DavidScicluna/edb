import { ReactElement } from 'react';

import { VStack, Box } from '@chakra-ui/react';

import Divider from './components/Divider';
import Header from './components/Header';
import { PageProps } from './types';

const Page = ({ children, title }: PageProps): ReactElement => {
  return (
    <VStack width='100%' divider={<Divider />} spacing={0}>
      {/* Header */}
      <Header title={title} actions={children.actions} />

      {/* Body */}
      <Box width='100%'>{children.body}</Box>
    </VStack>
  );
};

export default Page;
