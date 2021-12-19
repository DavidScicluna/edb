import { ReactElement } from 'react';

import { useTheme, useColorMode, HStack, Text, Icon, VStack } from '@chakra-ui/react';
import { ChevronRight as ChevronRightIcon } from 'react-feather';

import { handleReturnDate } from '../../../../../../../../../common/utils';
import Badge from '../../../../../../../../../components/Badge';
import { Theme } from '../../../../../../../../../theme/types';
import { HeaderProps } from './types';

const Header = (props: HeaderProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const { title, date, episodes = 0, isOpen = true, onToggle } = props;

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
      <VStack alignItems='flex-start' spacing={0}>
        <Text align='left' color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize='lg' fontWeight='semibold'>
          {title || 'N/A'}
        </Text>
        {date ? (
          <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='xs'>
            {handleReturnDate(date, 'full')}
          </Text>
        ) : null}
      </VStack>

      <HStack>
        <Badge label={`${episodes} episode${episodes === 0 || episodes > 1 ? 's' : ''}`} size='md' />
        <Icon as={ChevronRightIcon} />
      </HStack>
    </HStack>
  );
};

export default Header;
