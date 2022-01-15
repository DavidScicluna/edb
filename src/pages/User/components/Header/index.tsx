import { ReactElement } from 'react';

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
import TabList from '../../../../components/Tabs/components/TabList';
import { Theme } from '../../../../theme/types';
import Divider from '../../components/Divider';
import { HeaderProps } from './types';

const defaultMediaTypes: HeaderProps['mediaTypes'] = ['movie', 'tv', 'person'];

const defaultIsDisabled: HeaderProps['isDisabled'] = { movie: false, tv: false, person: false };

const Header = (props: HeaderProps): ReactElement => {
  const theme = useTheme<Theme>();

  const [ref, { height }] = useElementSize();

  const { activeTab, mediaTypes = defaultMediaTypes, isDisabled = defaultIsDisabled } = props;

  return (
    <HStack
      ref={ref}
      width='100%'
      minHeight='43px' // Size of DisplayMode since they might be un-rendered
      spacing={2}
      divider={
        <Fade
          in={!_.isNil(activeTab)}
          unmountOnExit
          style={{ marginLeft: theme.space[2], marginRight: theme.space[2] }}
        >
          <Divider orientation='vertical' height={height} />
        </Fade>
      }
    >
      <TabList
        renderTabs={_.compact([
          mediaTypes.includes('movie')
            ? {
                renderLeftIcon: ({ isSelected, fontSize }) =>
                  isSelected ? (
                    <TheatersTwoToneIcon style={{ fontSize }} />
                  ) : (
                    <TheatersOutlinedIcon style={{ fontSize }} />
                  ),
                // renderRightIcon: ({}) => , // TODO: Add Badge to Tabs
                label: 'Movies',
                isDisabled: isDisabled.movie
              }
            : undefined,
          mediaTypes.includes('tv')
            ? {
                renderLeftIcon: ({ isSelected, fontSize }) =>
                  isSelected ? <TvTwoToneIcon style={{ fontSize }} /> : <TvOutlinedIcon style={{ fontSize }} />,
                // renderRightIcon: ({}) => , // TODO: Add Badge to Tabs
                label: 'TV Shows',
                isDisabled: isDisabled.tv
              }
            : undefined,
          mediaTypes.includes('person')
            ? {
                renderLeftIcon: ({ isSelected, fontSize }) =>
                  isSelected ? (
                    <PeopleAltTwoToneIcon style={{ fontSize }} />
                  ) : (
                    <PeopleAltOutlinedIcon style={{ fontSize }} />
                  ),
                // renderRightIcon: ({}) => , // TODO: Add Badge to Tabs
                label: 'People',
                isDisabled: isDisabled.person
              }
            : undefined
        ])}
      />

      <Fade in={!_.isNil(activeTab)} unmountOnExit>
        <DisplayMode />
      </Fade>
    </HStack>
  );
};

export default Header;
