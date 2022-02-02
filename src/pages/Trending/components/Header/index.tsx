import React, { ReactElement, useContext } from 'react';

import { useTheme, HStack, Fade } from '@chakra-ui/react';
import {
  PeopleAltOutlined as PeopleAltOutlinedIcon,
  PeopleAltTwoTone as PeopleAltTwoToneIcon,
  TheatersOutlined as TheatersOutlinedIcon,
  TheatersTwoTone as TheatersTwoToneIcon,
  TvOutlined as TvOutlinedIcon,
  TvTwoTone as TvTwoToneIcon
} from '@material-ui/icons';
import _ from 'lodash';
import { useElementSize } from 'usehooks-ts';

import DisplayMode from '../../../../components/Clickable/DisplayMode';
import Divider from '../../../../components/Divider';
import TabList from '../../../../components/Tabs/components/TabList';
import { Theme } from '../../../../theme/types';
import { HeaderProps } from './types';

const Header = ({ activeTab }: HeaderProps): ReactElement => {
  const theme = useTheme<Theme>();

  const [ref, { height }] = useElementSize();

  return (
    <HStack
      ref={ref}
      width='100%'
      minHeight='43px' // Size of DisplayMode since they might be un-rendered
      maxHeight='43px' // Size of DisplayMode since they might be un-rendered
      spacing={2}
      divider={
        <Fade
          in={!_.isNil(activeTab)}
          unmountOnExit
          style={{ marginLeft: theme.space[2], marginRight: theme.space[2] }}
        >
          <Divider orientation='vertical' height={`${height}px`} />
        </Fade>
      }
    >
      <TabList
        renderTabs={[
          {
            renderLeftIcon: ({ isSelected, fontSize }) =>
              isSelected ? <TheatersTwoToneIcon style={{ fontSize }} /> : <TheatersOutlinedIcon style={{ fontSize }} />,
            label: 'Movies'
          },
          {
            renderLeftIcon: ({ isSelected, fontSize }) =>
              isSelected ? <TvTwoToneIcon style={{ fontSize }} /> : <TvOutlinedIcon style={{ fontSize }} />,
            label: 'TV Shows'
          },
          {
            renderLeftIcon: ({ isSelected, fontSize }) =>
              isSelected ? (
                <PeopleAltTwoToneIcon style={{ fontSize }} />
              ) : (
                <PeopleAltOutlinedIcon style={{ fontSize }} />
              ),
            label: 'People'
          }
        ]}
      />

      <Fade in={!_.isNil(activeTab)} unmountOnExit>
        <DisplayMode />
      </Fade>
    </HStack>
  );
};

export default Header;
