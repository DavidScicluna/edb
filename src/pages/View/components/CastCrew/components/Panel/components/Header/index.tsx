import { ReactElement } from 'react';

import { useTheme, useColorMode, HStack, Text, Icon } from '@chakra-ui/react';
import { ChevronRight as ChevronRightIcon } from 'react-feather';

import Badge from '../../../../../../../../components/Badge';
import { Theme } from '../../../../../../../../theme/types';
import { HeaderProps } from './types';

const Header = (props: HeaderProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const { title, total, isOpen = true, onToggle } = props;

  return (
    <HStack
      width='100%'
      justifyContent='space-between'
      onClick={() => onToggle()}
      p={2}
      sx={{
        'cursor': 'pointer',

        'width': '100%',

        'backgroundColor': 'transparent',

        'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`,

        '& .MuiSvgIcon-root': {
          color: colorMode === 'light' ? 'gray.400' : 'gray.500',

          fontSize: `${theme.fontSizes.xl} !important`,
          transform: `rotate(${isOpen ? '90deg' : '0deg'})`,

          transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
        },

        '&:hover': {
          '& .MuiSvgIcon-root': {
            color: colorMode === 'light' ? 'gray.900' : 'gray.50'
          }
        }
      }}>
      <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='lg' fontWeight='semibold'>
        {title}
      </Text>

      <HStack>
        <Badge label={String(total)} size='md' />
        <Icon as={ChevronRightIcon} />
      </HStack>
    </HStack>
  );
};

export default Header;
