import { ReactElement } from 'react';
import { Controller } from 'react-hook-form';

import { useMediaQuery, Wrap, WrapItem, HStack } from '@chakra-ui/react';

import _ from 'lodash';
import { useElementSize } from 'usehooks-ts';

import Genre from './components/Genre';
import { GenresProps } from './types';

import { useSelector } from '../../../../common/hooks';
import { Genre as GenreType } from '../../../../common/types';
import Button from '../../../../components/Clickable/Button';
import Divider from '../../../../components/Divider';
import Empty from '../../../../components/Empty';
import Panel from '../../../Panel';

const Genres = ({ form, mediaType }: GenresProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector((state) => state.user.ui.theme.color);
	const genres = useSelector((state) =>
		mediaType === 'movie' ? state.options.data.genres.movie : state.options.data.genres.tv
	);

	const [ref, { height }] = useElementSize();

	const handleGenreClick = (genre: GenreType): void => {
		const genres = form.getValues().genres;

		if (genres.some((activeGenre) => activeGenre === genre.id)) {
			form.setValue(
				'genres',
				genres.filter((activeGenre) => activeGenre !== genre.id),
				{ shouldDirty: true }
			);
		} else {
			form.setValue('genres', [...genres, genre.id], { shouldDirty: true });
		}
	};

	const handleAllClick = (): void => {
		if (form.getValues().genres.length === (genres || []).length) {
			form.setValue('genres', [], { shouldDirty: true });
		} else {
			form.setValue('genres', [...(genres || []).map((genre) => genre.id)], { shouldDirty: true });
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
							title: 'Genres',
							actions: (
								<HStack ref={ref} divider={<Divider orientation='vertical' height={`${height}px`} />}>
									<Button
										color={color}
										isDisabled={
											_.isNil(genres) ||
											_.isEmpty(genres) ||
											value.length === 0 ||
											value.length === (genres?.length || 0)
										}
										onClick={() => form.setValue('genres', [], { shouldDirty: true })}
										size='sm'
										variant='text'
									>
										Clear
									</Button>
									<Button
										color={color}
										isDisabled={_.isNil(genres) || _.isEmpty(genres)}
										onClick={() => handleAllClick()}
										size='sm'
										variant='text'
									>
										{handleAllLabel()}
									</Button>
								</HStack>
							)
						},
						body: (
							<Wrap width='100%' spacing={isSm ? 1 : 1.5}>
								{_.isNil(genres) || _.isEmpty(genres) ? (
									<WrapItem width='100%'>
										<Empty
											hasIllustration={false}
											label='Oh no!'
											description='Failed to find any genres!'
											size='sm'
											variant='transparent'
										/>
									</WrapItem>
								) : !_.isNil(genres) || !_.isEmpty(genres) ? (
									genres.map((genre) => (
										<WrapItem key={genre.id}>
											<Genre
												{...genre}
												isActive={value.some((activeGenre) => activeGenre === genre.id)}
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