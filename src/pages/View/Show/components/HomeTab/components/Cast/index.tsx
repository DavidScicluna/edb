import { ReactElement } from 'react';

import { useMediaQuery } from '@chakra-ui/react';
import _ from 'lodash';

import { useSelector } from '../../../../../../../common/hooks';
import { Cast as CastType } from '../../../../../../../common/types/tv';
import { handleReturnColor } from '../../../../../../../common/utils';
import Button from '../../../../../../../components/Clickable/Button';
import Empty from '../../../../../../../components/Empty';
import Error from '../../../../../../../components/Error';
import HorizontalGrid from '../../../../../../../components/Grid/Horizontal';
import VerticalPoster from '../../../../../../../components/Poster/Vertical';
import { CastProps } from './types';

const Cast = (props: CastProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { cast, name, isError = false, isSuccess = false, isLoading = true, onChangeTab } = props;

  const color = useSelector((state) => state.user.ui.theme.color);

  return (
    <HorizontalGrid
      title='Series Cast'
      footer={
        <Button
          color={handleReturnColor(color)}
          isFullWidth
          isDisabled={isLoading}
          onClick={() => onChangeTab()}
          size={isSm ? 'sm' : 'md'}
          variant='text'>
          {`View all ${cast?.length || 0} cast member${cast && (cast.length === 0 || cast.length > 1 ? 's' : '')}`}
        </Button>
      }
      isLoading={isLoading}
      hasDivider
      variant='outlined'>
      {!isLoading && isError ? (
        <Error
          label='Oh no! Something went wrong'
          description={`Failed to fetch ${name ? `"${name}"` : ''} tv show cast!`}
          variant='transparent'
        />
      ) : !isLoading && isSuccess && cast && cast.length === 0 ? (
        <Empty label={`${name ? `"${name}"` : ''} tv show cast list is currently empty!`} variant='transparent' />
      ) : !isLoading && isSuccess && cast && cast.length > 0 ? (
        <>
          {cast
            .filter((_person, index) => index < 20)
            .map((person: CastType) => (
              <VerticalPoster
                key={person.id}
                width={['185px', '205px', '230px']}
                mediaItem={person ? { ...person } : undefined}
                mediaType='person'
                image={{
                  alt: `${person?.name || ''} person poster`,
                  src: person?.profile_path || '',
                  size: {
                    thumbnail: 'w45',
                    full: 'original'
                  }
                }}
                title={person?.name || ''}
                subtitle={`${person.total_episode_count} episode${
                  person.total_episode_count === 0 || person.total_episode_count > 1 ? 's' : ''
                }`}
                isLoading={isLoading}
              />
            ))}
        </>
      ) : (
        <>
          {_.range(0, 20).map((_dummy, index: number) => (
            <VerticalPoster
              key={index}
              width={['185px', '205px', '230px']}
              mediaType='person'
              title='Lorem ipsum'
              subtitle='2021 • Lorem ipsum dolor sit amet'
              isLoading
            />
          ))}
        </>
      )}
    </HorizontalGrid>
  );
};

export default Cast;
