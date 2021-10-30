import React, { ReactElement } from 'react';

import { useTheme, useColorMode, useMediaQuery, useBoolean, HStack, Text, Icon } from '@chakra-ui/react';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';

import Badge from '../../../../../../../../components/Badge';
import { Theme } from '../../../../../../../../theme/types';
import { HeaderProps } from './types';

const Header = (props: HeaderProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { title, total, isOpen = true, onToggle } = props;

  const [isHovering, setIsHovering] = useBoolean();

  return (
    <HStack
      width='100%'
      justifyContent='space-between'
      onClick={() => onToggle()}
      onMouseEnter={() => setIsHovering.on()}
      onMouseLeave={() => setIsHovering.off()}
      p={2}
      sx={{
        cursor: 'pointer',

        width: '100%',

        backgroundColor: 'transparent',

        transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
      }}>
      <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='lg' fontWeight='semibold'>
        {title}
      </Text>

      <HStack>
        <Badge label={String(total)} size={isSm ? 'sm' : 'md'} />
        <Icon
          as={ChevronRightOutlinedIcon}
          color={colorMode === 'light' ? (isHovering ? 'gray.900' : 'gray.400') : isHovering ? 'gray.50' : 'gray.500'}
          sx={{
            fontSize: `${theme.fontSizes.xl} !important`,
            transform: `rotate(${isOpen ? '90deg' : '0deg'})`,
            transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
          }}
        />
      </HStack>
    </HStack>
  );
};

export default Header;
