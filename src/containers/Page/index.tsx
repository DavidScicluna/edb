import { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

import { VStack, Box } from '@chakra-ui/react';

import Divider from './components/Divider';
import Header from './components/Header';
import { PageProps } from './types';

const Page = ({ children, title }: PageProps): ReactElement => {
  const location = useLocation();

  return (
    <VStack width='100%' divider={<Divider />} spacing={0}>
      {/* Header */}
      {location.pathname !== '/' ? <Header title={title} actions={children.actions} /> : null}

      {/* Body */}
      <Box width='100%'>{children.body}</Box>
    </VStack>
  );
};

export default Page;
