import { ReactElement } from 'react';

import { useMediaQuery, Wrap, WrapItem } from '@chakra-ui/react';
import _ from 'lodash';
import { Controller } from 'react-hook-form';

import { useSelector } from '../../../../common/hooks';
import { Genre as GenreType } from '../../../../common/types';
import Button from '../../../../components/Clickable/Button';
import Empty from '../../../../components/Empty';
import Error from '../../../../components/Error';
import Panel from '../../../Panel';
import Genre from './components/Genre';
import { GenresProps } from './types';

const Genres = (props: GenresProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  const { genres, form, isLoading = true, isError = false } = props;

  const handleGenreClick = (genre: GenreType): void => {
    const genres = form.getValues().genres;

    if (genres.some((activeGenre) => activeGenre.id === genre.id)) {
      form.setValue(
        'genres',
        genres.filter((activeGenre) => activeGenre.id !== genre.id),
        { shouldDirty: true }
      );
    } else {
      form.setValue('genres', [...genres, genre], { shouldDirty: true });
    }
  };

  const handleAllClick = (): void => {
    if (form.getValues().genres.length === (genres || []).length) {
      form.setValue('genres', [], { shouldDirty: true });
    } else {
      form.setValue('genres', [...(genres || [])], { shouldDirty: true });
    }
  };

  const handleAllLabel = (): string => {
    return `${form.getValues().genres.length === (genres || []).length ? 'Remove' : 'Select'} All`;
  };

  return (
    <Controller
      control={form.control}
      name='genres'
      render={({ field: { value } }) => (
        <Panel isFullWidth>
          {{
            header: {
              actions: (
                <Button
                  color={color}
                  isDisabled={isLoading || isError}
                  onClick={() => handleAllClick()}
                  size='sm'
                  variant='text'
                >
                  {handleAllLabel()}
                </Button>
              ),
              title: 'Genres'
            },
            body: (
              <Wrap width='100%' spacing={isSm ? 1 : 1.5}>
                {!isLoading && isError ? (
                  <WrapItem width='100%'>
                    <Error
                      hasIllustration={false}
                      label='Oh no! Something went wrong 😭'
                      description='Failed to fetch genres!'
                      size='sm'
                      variant='transparent'
                    />
                  </WrapItem>
                ) : !isLoading && _.isNil(genres) ? (
                  <WrapItem width='100%'>
                    <Empty
                      hasIllustration={false}
                      label='Oh no!'
                      description='Failed to find any genres!'
                      size='sm'
                      variant='transparent'
                    />
                  </WrapItem>
                ) : !isLoading && !_.isNil(genres) ? (
                  genres.map((genre) => (
                    <WrapItem key={genre.id}>
                      <Genre
                        {...genre}
                        isActive={value.some((activeGenre) => activeGenre.id === genre.id)}
                        isLoading={false}
                        onClick={handleGenreClick}
                      />
                    </WrapItem>
                  ))
                ) : (
                  _.range(0, 15).map((_dummy, index) => (
                    <WrapItem key={index}>
                      <Genre isLoading />
                    </WrapItem>
                  ))
                )}
              </Wrap>
            )
          }}
        </Panel>
      )}
    />
  );
};

export default Genres;
