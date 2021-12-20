import { ReactElement } from 'react';

import { useColorMode, HStack, Text } from '@chakra-ui/react';
import { ArrowLeft as ArrowLeftIcon, ArrowRight as ArrowRightIcon } from 'react-feather';

import IconButton from '../../../Clickable/IconButton';
import { NavigationProps } from './types';

const Navigation = (props: NavigationProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { current, total, onNavigation } = props;

  return (
    <HStack position='absolute' bottom={1} right={1} zIndex={2} backgroundColor='transparent' spacing={0}>
      {/* Left button */}
      <IconButton
        aria-label='Previous photo'
        icon={ArrowLeftIcon}
        isDisabled={current <= 1}
        onClick={() => onNavigation('prev')}
        variant='icon'
      />

      {/* Current Slide */}
      <Text
        align='center'
        color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
        fontSize='md'
      >{`${current} / ${total}`}</Text>

      {/* Right button */}
      <IconButton
        aria-label='Next photo'
        icon={ArrowRightIcon}
        isDisabled={current >= total}
        onClick={() => onNavigation('next')}
        variant='icon'
      />
    </HStack>
  );
};

export default Navigation;
