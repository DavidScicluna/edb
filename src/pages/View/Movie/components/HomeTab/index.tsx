import { ReactElement } from 'react';

import { VStack, Fade } from '@chakra-ui/react';

import Cover from '../../../components/Cover';
import Backdrop from '../../../components/Cover/components/Backdrop';
import Poster from '../../../components/Cover/components/Poster';
import Details from '../../../components/Details';
import Media from '../../../components/Media';
import Cast from './components/Cast';
import Collection from './components/Collection';
import Credits from './components/Credits';
import Info from './components/Info';
import Recommendations from './components/Recommendations';
import { HomeTabProps } from './types';

const HomeTab = (props: HomeTabProps): ReactElement => {
  const {
    movieQuery,
    creditsQuery,
    imagesQuery,
    videosQuery,
    collectionsQuery,
    recommendationsQuery,
    onCoverClick,
    onMediaClick,
    onChangeTab
  } = props;

  return (
    <VStack width='100%' maxWidth='100%' spacing={4}>
      <Details
        renderCover={
          <Cover>
            {{
              poster: (
                <Poster
                  title={movieQuery.data?.title}
                  path={movieQuery.data?.poster_path}
                  isLoading={movieQuery.isFetching || movieQuery.isLoading}
                  isError={movieQuery.isError}
                  onClick={onCoverClick}
                />
              ),
              backdrop: (
                <Backdrop
                  title={movieQuery.data?.title}
                  path={movieQuery.data?.backdrop_path}
                  video={movieQuery.data?.video || (videosQuery.data?.results.length || 0) > 0}
                  isLoading={
                    movieQuery.isFetching || movieQuery.isLoading || videosQuery.isFetching || videosQuery.isLoading
                  }
                  isError={movieQuery.isError || videosQuery.isError}
                  onClick={onCoverClick}
                />
              )
            }}
          </Cover>
        }
        renderDetails={
          <>
            <Credits
              directors={creditsQuery.data?.crew.filter((crew) => crew.job === 'Director')}
              executiveProducer={creditsQuery.data?.crew.filter((crew) => crew.job === 'Executive Producer')}
              producers={creditsQuery.data?.crew.filter((crew) => crew.job === 'Producer')}
              writers={creditsQuery.data?.crew.filter((crew) => crew.job === 'Writer')}
              isLoading={creditsQuery.isFetching || creditsQuery.isLoading}
            />

            <Info
              budget={movieQuery.data?.budget}
              revenue={movieQuery.data?.revenue}
              originalLanguage={movieQuery.data?.original_language}
              languages={movieQuery.data?.spoken_languages}
              isLoading={movieQuery.isFetching || movieQuery.isLoading}
            />
          </>
        }
        tagline={movieQuery.data?.tagline}
        overview={movieQuery.data?.overview}
        isLoading={movieQuery.isFetching || movieQuery.isLoading}
      />

      <Cast
        cast={creditsQuery.data?.cast}
        name={movieQuery.data?.title}
        isError={creditsQuery.isError}
        isSuccess={creditsQuery.isSuccess}
        isLoading={creditsQuery.isFetching || creditsQuery.isLoading}
        onChangeTab={() => onChangeTab(1)}
      />

      <Media
        title={movieQuery.data?.title}
        photos={imagesQuery.data?.posters}
        backdrops={imagesQuery.data?.backdrops}
        videos={videosQuery.data?.results}
        isError={{
          images: imagesQuery.isError,
          videos: videosQuery.isError
        }}
        isSuccess={{
          images: imagesQuery.isSuccess,
          videos: videosQuery.isSuccess
        }}
        isLoading={{
          images: imagesQuery.isFetching || imagesQuery.isLoading,
          videos: videosQuery.isFetching || videosQuery.isLoading
        }}
        onClick={onMediaClick}
      />

      <Fade in={collectionsQuery.isSuccess && Boolean(collectionsQuery.data)} unmountOnExit style={{ width: '100%' }}>
        <Collection
          id={movieQuery.data?.id}
          name={collectionsQuery.data?.name || ''}
          parts={collectionsQuery.data?.parts || []}
        />
      </Fade>

      <Recommendations
        recommendations={recommendationsQuery.data}
        title={movieQuery.data?.title}
        isError={recommendationsQuery.isError}
        isSuccess={recommendationsQuery.isSuccess}
        isLoading={recommendationsQuery.isFetching || recommendationsQuery.isLoading}
      />
    </VStack>
  );
};

export default HomeTab;
