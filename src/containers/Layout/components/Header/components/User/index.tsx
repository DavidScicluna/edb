import { ReactElement, useEffect } from 'react';

import {
  useColorMode,
  useDisclosure,
  Avatar,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  VStack,
  HStack,
  Text,
  Box
} from '@chakra-ui/react';
import { Heart as HeartIcon, Bookmark as BookmarkIcon, Sliders as SlidersIcon } from 'react-feather';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import NavItem from '../../../../../../components/NavItem';
import { NavItem as NavItemType } from '../../../../../../components/NavItem/types';
import { toggleDisplay } from '../../../../../../store/slices/Modals';

const User = (): ReactElement => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  const location = useLocation();

  const userLinks: NavItemType[] = [
    {
      label: 'Liked',
      path: '/liked',
      icon: HeartIcon
    },
    {
      label: 'Lists',
      path: '/lists',
      icon: BookmarkIcon
    },
    {
      label: 'Display',
      icon: SlidersIcon,
      onClick: () => dispatch(toggleDisplay(true))
    }
  ];

  useEffect(() => onClose(), [location]);

  return (
    <Popover isOpen={isOpen} placement='bottom-end' gutter={12} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <Avatar cursor='pointer' name='Test User' size='md' />
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          width='auto'
          minWidth='225px'
          border='solid2'
          borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
          borderRadius='lg'
          backgroundColor={colorMode === 'light' ? 'gray.50' : 'gray.900'}
          boxShadow='none'
          p={2}
          sx={{
            '&:focus': {
              boxShadow: 'none'
            }
          }}>
          <VStack width='100%' spacing={2}>
            <HStack width='100%' justifyContent='flex-start' spacing={1}>
              <Avatar cursor='pointer' name='Test User' size='md' />
              <Text
                align='left'
                color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
                fontSize='md'
                fontWeight='semibold'>
                Test User
              </Text>
            </HStack>
            <Box
              width='100%'
              height='2px'
              border='solid1'
              borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
            />
            <VStack width='100%' spacing={1}>
              {userLinks.map((userLink) => (
                <NavItem key={userLink.label} {...userLink} sidebarMode='expanded' />
              ))}
            </VStack>
          </VStack>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default User;
