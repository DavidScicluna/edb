import { ReactElement, useState, useEffect } from 'react';

import { VStack } from '@chakra-ui/react';

import _ from 'lodash';


import Collections from './components/Collections';
import Companies from './components/Companies';
import People from './components/People';

import { useSelector } from '../../../../common/hooks';
import { MediaType } from '../../../../common/types';
import Divider from '../../../../components/Divider';
import Tabs from '../../../../components/Tabs';
import TabPanels from '../../../../components/Tabs/components/TabPanels';
import Page from '../../../../containers/Page';
import MediaTypesHeader from '../../components/MediaTypesHeader';
import MediaTypesPicker from '../../components/MediaTypesPicker';
import Movies from '../../components/Movies';
import TV from '../../components/TV';

const Liked = (): ReactElement => {
  const movies = useSelector((state) => state.user.data.liked.movies);
  const tv = useSelector((state) => state.user.data.liked.tv);
  const people = useSelector((state) => state.user.data.liked.people);
  const companies = useSelector((state) => state.user.data.liked.companies);
  const collections = useSelector((state) => state.user.data.liked.collections);

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

    if (companies.length > 0) {
      mediaTypes.push('company');
    }

    if (collections.length > 0) {
      mediaTypes.push('collection');
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
      case 'company':
        setActiveTab(3);
        return;
      case 'collection':
        setActiveTab(4);
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

    if (companies && companies.length > 0) {
      mediaTypes = mediaTypes + 1;
    }

    if (collections && collections.length > 0) {
      mediaTypes = mediaTypes + 1;
    }

    if (mediaTypes > 0 && mediaTypes === 1) {
      if (movies && movies.length > 0) {
        handleSetMediaType('movie');
      } else if (tv && tv.length > 0) {
        handleSetMediaType('tv');
      } else if (people && people.length > 0) {
        handleSetMediaType('person');
      } else if (companies && companies.length > 0) {
        handleSetMediaType('company');
      } else if (collections && collections.length > 0) {
        handleSetMediaType('collection');
      }
    }
  };

  const handleCheckLocation = (): void => {
    const hash = String(location.hash).replace('#', '');

    if (!_.isEmpty(hash)) {
      switch (hash) {
        case 'movie':
          setActiveTab(0);
          return;
        case 'tv':
          setActiveTab(1);
          return;
        case 'person':
          setActiveTab(2);
          return;
        case 'company':
          setActiveTab(3);
          return;
        case 'collection':
          setActiveTab(4);
          return;
        default:
          setActiveTab(undefined);
          return;
      }
    } else {
      handleCheckHasMediaTypes();
    }
  };

  useEffect(() => {
    handleCheckLocation();
  }, [location]);

  useEffect(() => {
    handleCheckLocation();

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
              <MediaTypesHeader
                activeTab={activeTab}
                total={{
                  movie: movies.length,
                  tv: tv.length,
                  person: people.length,
                  company: companies.length,
                  collection: collections.length
                }}
              />

              {_.isNil(activeTab) ? (
                <MediaTypesPicker
                  mediaTypes={handleReturnMediaTypes()}
                  label='Oh no! Liked list is currently empty.'
                  description='Unfortunately, you have not liked any items. Please like an item to view it in the liked list.'
                  onSetMediaType={handleSetMediaType}
                />
              ) : (
                <TabPanels>
                  <Movies movies={movies} />
                  <TV shows={tv} />
                  <People people={people} />
                  <Companies companies={companies} />
                  <Collections collections={collections} />
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
