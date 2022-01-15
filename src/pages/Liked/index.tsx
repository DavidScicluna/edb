import { ReactElement, useState, useEffect } from 'react';

import { HStack, VStack, Fade, useTheme } from '@chakra-ui/react';
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

import { useSelector } from '../../common/hooks';
import { MediaType } from '../../common/types';
import DisplayMode from '../../components/Clickable/DisplayMode';
import Tabs from '../../components/Tabs';
import TabList from '../../components/Tabs/components/TabList';
import TabPanels from '../../components/Tabs/components/TabPanels';
import Page from '../../containers/Page';
import { Theme } from '../../theme/types';
import VerticalMovies from '../Movies/components/Orientation/Vertical';
import VerticalPeople from '../People/components/Orientation/Vertical';
import VerticalTV from '../TV/components/Orientation/Vertical';
import Divider from './components/Divider';
import Inactive from './components/Inactive';

const Liked = (): ReactElement => {
  const theme = useTheme<Theme>();

  const movies = useSelector((state) => state.user.data.liked.movies);
  const tv = useSelector((state) => state.user.data.liked.tv);
  const people = useSelector((state) => state.user.data.liked.people);

  const [headerRef, { height }] = useElementSize();

  const [activeTab, setActiveTab] = useState<number>();

  const handleReturnMediaTypes = (): MediaType[] => {
    const mediaTypes: MediaType[] = [];

    if (movies.length > 0) {
      mediaTypes.push('movie');
    }

    if (tv.length > 0) {
      mediaTypes.push('tv');
    }

    if (people.length > 0) {
      mediaTypes.push('person');
    }

    return mediaTypes;
  };

  const handleSetMediaType = (mediaType: MediaType): void => {
    switch (mediaType) {
      case 'movie':
        setActiveTab(0);
        return;
      case 'tv':
        setActiveTab(1);
        return;
      case 'person':
        setActiveTab(2);
        return;
    }
  };

  const handleCheckHasMediaTypes = (): void => {
    let mediaTypes = 0;

    if (movies && movies.length > 0) {
      mediaTypes = mediaTypes + 1;
    }

    if (tv && tv.length > 0) {
      mediaTypes = mediaTypes + 1;
    }

    if (people && people.length > 0) {
      mediaTypes = mediaTypes + 1;
    }

    if (mediaTypes > 0 && mediaTypes === 1) {
      if (movies && movies.length > 0) {
        handleSetMediaType('movie');
      } else if (tv && tv.length > 0) {
        handleSetMediaType('tv');
      } else if (people && people.length > 0) {
        handleSetMediaType('person');
      }
    }
  };

  useEffect(() => {
    handleCheckHasMediaTypes();

    return () => {
      setActiveTab(undefined);
    };
  }, []);

  return (
    <Page title='Liked'>
      {{
        body: (
          <Tabs activeTab={activeTab} onChange={(index: number) => setActiveTab(index)}>
            <VStack width='100%' divider={<Divider orientation='horizontal' />} spacing={2} p={2}>
              <HStack
                ref={headerRef}
                width='100%'
                spacing={2}
                divider={
                  <Fade in={!_.isNil(activeTab)} unmountOnExit style={{ height, margin: `0 ${theme.space[2]}` }}>
                    <Divider orientation='vertical' height={height} />
                  </Fade>
                }
              >
                <TabList
                  renderTabs={[
                    {
                      renderLeftIcon: ({ isSelected, fontSize }) =>
                        isSelected ? (
                          <TheatersTwoToneIcon style={{ fontSize }} />
                        ) : (
                          <TheatersOutlinedIcon style={{ fontSize }} />
                        ),
                      // renderRightIcon: ({}) => , // TODO: Add Badge to Tabs
                      label: 'Movies',
                      isDisabled: movies.length === 0
                    },
                    {
                      renderLeftIcon: ({ isSelected, fontSize }) =>
                        isSelected ? <TvTwoToneIcon style={{ fontSize }} /> : <TvOutlinedIcon style={{ fontSize }} />,
                      label: 'TV Shows',
                      isDisabled: tv.length === 0
                    },
                    {
                      renderLeftIcon: ({ isSelected, fontSize }) =>
                        isSelected ? (
                          <PeopleAltTwoToneIcon style={{ fontSize }} />
                        ) : (
                          <PeopleAltOutlinedIcon style={{ fontSize }} />
                        ),
                      label: 'People',
                      isDisabled: people.length === 0
                    }
                  ]}
                />

                <Fade in={!_.isNil(activeTab)} unmountOnExit>
                  <DisplayMode />
                </Fade>
              </HStack>

              {_.isNil(activeTab) ? (
                <Inactive mediaTypes={handleReturnMediaTypes()} onSetMediaType={handleSetMediaType} />
              ) : (
                <TabPanels>
                  <VerticalMovies
                    isError={movies.length === 0}
                    isSuccess={movies.length > 0}
                    isLoading={false}
                    movies={movies}
                  />
                  <VerticalTV isError={tv.length === 0} isSuccess={tv.length > 0} isLoading={false} shows={tv} />
                  <VerticalPeople
                    isError={people.length === 0}
                    isSuccess={people.length > 0}
                    isLoading={false}
                    people={people}
                  />
                </TabPanels>
              )}
            </VStack>
          </Tabs>
        )
      }}
    </Page>
  );
};

export default Liked;
