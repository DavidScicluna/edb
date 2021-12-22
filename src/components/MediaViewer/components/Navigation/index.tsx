import { ReactElement } from 'react';

import { useColorMode, HStack, Text } from '@chakra-ui/react';
import {
  ArrowBackOutlined as ArrowBackOutlinedIcon,
  ArrowForwardOutlined as ArrowForwardOutlinedIcon
} from '@material-ui/icons';

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
        isDisabled={current <= 1}
        onClick={() => onNavigation('prev')}
        variant='icon'
      >
        <ArrowBackOutlinedIcon />
      </IconButton>

      {/* Current Slide */}
      <Text
        align='center'
        color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
        fontSize='md'
      >{`${current} / ${total}`}</Text>

      {/* Right button */}
      <IconButton
        aria-label='Next photo'
        isDisabled={current >= total}
        onClick={() => onNavigation('next')}
        variant='icon'
      >
        <ArrowForwardOutlinedIcon />
      </IconButton>
    </HStack>
  );
};

export default Navigation;
