import React, { ReactElement } from 'react';

import { HStack } from '@chakra-ui/react';
import CountUp from 'react-countup';
import { useElementSize } from 'usehooks-ts';

import { useSelector } from '../../../../../../../../../../common/hooks';
import Badge from '../../../../../../../../../../components/Badge';
import DisplayMode from '../../../../../../../../../../components/Clickable/DisplayMode';
import Divider from '../../../../../../../../../../components/Divider';
import TabList from '../../../../../../../../../../components/Tabs/components/TabList';
import { HeaderProps } from './types';

const Header = ({ movies = 0, shows = 0 }: HeaderProps): ReactElement => {
  const color = useSelector((state) => state.user.ui.theme.color);

  const [ref, { height }] = useElementSize();

  return (
    <HStack width='100%' divider={<Divider orientation='vertical' height={height || '100%'} mx={2} />} spacing={2}>
      <TabList
        renderTabs={[
          {
            label: 'Movies',
            isDisabled: movies === 0,
            renderRightIcon: ({ fontSize, isSelected }) => (
              <Badge
                color={isSelected ? color : 'gray'}
                isLight={false}
                size={fontSize === 'md' ? 'md' : fontSize === 'sm' ? 'sm' : 'xs'}
              >
                <CountUp duration={1} end={movies} />
              </Badge>
            )
          },
          {
            label: 'TV Shows',
            isDisabled: shows === 0,
            renderRightIcon: ({ fontSize, isSelected }) => (
              <Badge
                color={isSelected ? color : 'gray'}
                isLight={false}
                size={fontSize === 'md' ? 'md' : fontSize === 'sm' ? 'sm' : 'xs'}
              >
                <CountUp duration={1} end={shows} />
              </Badge>
            )
          }
        ]}
      />

      <DisplayMode ref={ref} />
    </HStack>
  );
};

export default Header;
