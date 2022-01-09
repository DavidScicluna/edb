import { ReactElement, useState, useEffect } from 'react';

import { useMediaQuery } from '@chakra-ui/react';
import _ from 'lodash';

import { useSelector } from '../../../../common/hooks';
import { PartialMovie } from '../../../../common/types/movie';
import { PartialPerson } from '../../../../common/types/person';
import { PartialTV } from '../../../../common/types/tv';
import Button from '../../../../components/Clickable/Button';
import Link from '../../../../components/Clickable/Link';
import Empty from '../../../../components/Empty';
import Error from '../../../../components/Error';
import HorizontalTabbedGrid from '../../../../components/Grid/Horizontal/Tabbed';
import VerticalMoviePoster from '../../../Movies/components/Poster/Vertical';
import VerticalPersonPoster from '../../../People/components/Poster/Vertical';
import VerticalTVShowPoster from '../../../TV/components/Poster/Vertical';
import { HomeHorizontalGridProps } from './types';

const widths = ['185px', '205px', '230px'];

const HomeHorizontalGrid = (props: HomeHorizontalGridProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  const { title, to, mediaTypes, data, isLoading, isError, isSuccess } = props;

  const [activeTab, setActiveTab] = useState<number>(0);

  const handleIsDisabled = (): boolean => {
    switch (activeTab) {
      case 0:
        return isLoading.movie || isError.movie || false;
      case 1:
        return isLoading.tv || isError.tv || false;
      case 2:
        return isLoading.person || isError.person || false;
      default:
        return true;
    }
  };

  useEffect(() => {
    if (isSuccess.movie) {
      setActiveTab(0);
    } else if (isSuccess.tv) {
      setActiveTab(1);
    } else if (isSuccess.person) {
      setActiveTab(2);
    }
  }, [isSuccess]);

  return (
    <HorizontalTabbedGrid
      title={title}
      activeTab={activeTab}
      onChange={(index: number) => setActiveTab(index)}
      footer={
        <Link to={{ ...to({ mediaType: mediaTypes[activeTab] }) }} isFullWidth isDisabled={handleIsDisabled()}>
          <Button color={color} isFullWidth isDisabled={handleIsDisabled()} size={isSm ? 'sm' : 'md'} variant='text'>
            {`View all ${title} ${mediaTypes[activeTab]}`}
          </Button>
        </Link>
      }
      isDisabled={handleIsDisabled()}
      renderTabListProps={{
        renderTabs: _.compact([
          mediaTypes.includes('movie')
            ? {
                label: 'Movies',
                isDisabled: isLoading.movie
              }
            : undefined,
          mediaTypes.includes('tv')
            ? {
                label: 'TV Shows',
                isDisabled: isLoading.tv
              }
            : undefined,
          mediaTypes.includes('person')
            ? {
                label: 'People',
                isDisabled: isLoading.person
              }
            : undefined
        ])
      }}
      // variant='transparent'
    >
      {/* Movies */}
      <>
        {!isLoading.movie && isError.movie ? (
          <Error
            label='Oh no! Something went wrong'
            description={`Failed to fetch ${title} movies list!`}
            variant='transparent'
          />
        ) : !isLoading.movie && isSuccess.movie && data.movie && data.movie.length === 0 ? (
          <Empty
            label='Oh no! Something went wrong'
            description={`${title} Movies list is currently empty!`}
            variant='transparent'
          />
        ) : !isLoading.movie && isSuccess.movie && data.movie && data.movie.length > 0 ? (
          data.movie.map((movie: PartialMovie) => (
            <VerticalMoviePoster key={movie.id} width={widths} movie={movie} isLoading={false} />
          ))
        ) : (
          _.range(0, 20).map((_dummy, index: number) => <VerticalMoviePoster key={index} width={widths} isLoading />)
        )}
      </>

      {/* TV Shows */}
      <>
        {!isLoading.tv && isError.tv ? (
          <Error
            label='Oh no! Something went wrong'
            description={`Failed to fetch ${title} TV Shows list!`}
            variant='transparent'
          />
        ) : !isLoading.tv && isSuccess.tv && data.tv && data.tv.length === 0 ? (
          <Empty label={`${title} TV Shows list is currently empty!`} variant='transparent' />
        ) : !isLoading.tv && isSuccess.tv && data.tv && data.tv.length > 0 ? (
          data.tv.map((show: PartialTV) => (
            <VerticalTVShowPoster key={show.id} width={widths} show={show} isLoading={false} />
          ))
        ) : (
          _.range(0, 20).map((_dummy, index: number) => <VerticalTVShowPoster key={index} width={widths} isLoading />)
        )}
      </>

      {/* People */}
      <>
        {!isLoading.tv && isError.tv ? (
          <Error
            label='Oh no! Something went wrong'
            description={`Failed to fetch ${title} people list!`}
            variant='transparent'
          />
        ) : !isLoading.tv && isSuccess.tv && data.person && data.person.length === 0 ? (
          <Empty label={`${title} People list is currently empty!`} variant='transparent' />
        ) : !isLoading.tv && isSuccess.tv && data.person && data.person.length > 0 ? (
          data.person.map((person: PartialPerson) => (
            <VerticalPersonPoster key={person.id} width={widths} person={person} isLoading={false} />
          ))
        ) : (
          _.range(0, 20).map((_dummy, index: number) => <VerticalPersonPoster key={index} width={widths} isLoading />)
        )}
      </>
    </HorizontalTabbedGrid>
  );
};

export default HomeHorizontalGrid;
