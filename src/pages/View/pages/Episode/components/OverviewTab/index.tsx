import { ReactElement } from 'react';

import { VStack, Collapse } from '@chakra-ui/react';
import _ from 'lodash';

import Paragraph from '../../../../../../components/Paragraph';
import Media from '../../../../components/Media';
import Cast from './components/Cast';
import Guests from './components/Guests';
import Show from './components/Show';
import { OverviewTabProps } from './types';

const OverviewTab = (props: OverviewTabProps): ReactElement => {
  const { tvShowQuery, episodeQuery, creditsQuery, imagesQuery, videosQuery, onAssetClick, onChangeTab } = props;

  return (
    <VStack width='100%' spacing={4}>
      <Collapse
        in={
          (!_.isNil(episodeQuery.data?.overview) && !_.isEmpty(episodeQuery.data?.overview)) ||
          episodeQuery.isFetching ||
          episodeQuery.isLoading
        }
        unmountOnExit
        style={{ width: '100%' }}
      >
        <Paragraph
          title='Overview'
          paragraphs={episodeQuery.data?.overview || ''}
          isLoading={episodeQuery.isFetching || episodeQuery.isLoading}
        />
      </Collapse>

      <Cast
        name={episodeQuery.data?.name}
        cast={creditsQuery.data?.cast}
        isError={creditsQuery.isError}
        isSuccess={creditsQuery.isSuccess}
        isLoading={creditsQuery.isFetching || creditsQuery.isLoading}
        onChangeTab={() => onChangeTab(1)}
      />

      <Guests
        name={episodeQuery.data?.name}
        guests={creditsQuery.data?.guest_stars}
        isError={creditsQuery.isError}
        isSuccess={creditsQuery.isSuccess}
        isLoading={creditsQuery.isFetching || creditsQuery.isLoading}
        onChangeTab={() => onChangeTab(1)}
      />

      <Show show={tvShowQuery.data} isLoading={tvShowQuery.isFetching || tvShowQuery.isLoading} />

      <Media
        alt={episodeQuery.data?.name}
        assets={_.compact([
          {
            label: 'Backdrops',
            type: 'backdrop',
            isDisabled: (imagesQuery.data?.stills || []).length === 0,
            data: imagesQuery.data?.stills || []
          },
          {
            label: 'Videos',
            type: 'video',
            isDisabled: videosQuery.data?.results?.length === 0,
            data: videosQuery.data?.results || []
          }
        ])}
        mediaType='tv'
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
        onAssetClick={onAssetClick}
        onFooterClick={() => onChangeTab(2)}
      />
    </VStack>
  );
};

export default OverviewTab;
