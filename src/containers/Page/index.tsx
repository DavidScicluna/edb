import React, { ReactElement } from 'react';

import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const ComponentBox = motion(Box);

const Page = ({ children }: { children: ReactElement }): ReactElement => {
  return (
    <ComponentBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 1,
        ease: [0.76, 0, 0.24, 1]
      }}>
      {children}
    </ComponentBox>
  );
};

export default Page;
