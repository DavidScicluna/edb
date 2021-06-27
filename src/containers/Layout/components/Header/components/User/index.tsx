import React, { ReactElement } from 'react';

import { useColorMode, useDisclosure, Avatar, Popover, PopoverTrigger, Portal, PopoverContent } from '@chakra-ui/react';

const User = (): ReactElement => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Popover isOpen={isOpen} placement='bottom-end' gutter={12} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <Avatar cursor='pointer' name='Test User' size='md' />
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          width='auto'
          border='solid2'
          borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
          borderRadius='lg'
          boxShadow='none'
          p={2}
          sx={{
            '&:focus': {
              boxShadow: 'none'
            }
          }}>
          <h1>Hello</h1>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default User;
