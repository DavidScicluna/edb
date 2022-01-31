import { ReactElement, useState } from 'react';

import { useTheme, useColorMode, HStack, Text } from '@chakra-ui/react';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import _ from 'lodash';
import CountUp from 'react-countup';

import { useSelector } from '../../../../../../../../../../common/hooks';
import Badge from '../../../../../../../../../../components/Badge';
import SkeletonText from '../../../../../../../../../../components/Skeleton/Text';
import { Theme } from '../../../../../../../../../../theme/types';
import { HeaderProps } from './types';

const dummies = _.range(25, 100, 10);

const Header = (props: HeaderProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const color = useSelector((state) => state.user.ui.theme.color);

  const { title, total, isOpen = false, isLoading = true, onToggle } = props;

  const [dummy] = useState<number>(_.sample(dummies) || 100);

  return (
    <HStack
      width='100%'
      justifyContent='space-between'
      onClick={onToggle ? () => onToggle() : undefined}
      p={2}
      sx={{
        'cursor': isLoading ? 'default' : 'pointer',

        'width': '100%',

        'backgroundColor': 'transparent',

        'transition': `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`,

        '&:hover': {
          '& svg': {
            color: colorMode === 'light' ? 'gray.900' : 'gray.50'
          }
        }
      }}
    >
      <SkeletonText width={isLoading ? `${dummy}%` : 'auto'} fontSize='lg' isLoaded={!isLoading}>
        <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='lg' fontWeight='semibold'>
          {title}
        </Text>
      </SkeletonText>

      <HStack>
        {total ? (
          <Badge color={isOpen ? color : 'gray'} fontSize='lg'>
            <CountUp duration={1} end={total} />
          </Badge>
        ) : null}
        <ChevronRightOutlinedIcon
          style={{
            fontSize: theme.fontSizes.xl,
            color: theme.colors.gray[colorMode === 'light' ? 400 : 500],

            transform: `rotate(${isOpen ? '90deg' : '0deg'})`,

            transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
          }}
        />
      </HStack>
    </HStack>
  );
};

export default Header;
