import { ReactElement } from 'react';


import { useMediaQuery, Wrap, WrapItem, HStack , Button } from '@chakra-ui/react';

import { Controller } from 'react-hook-form';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import range from 'lodash/range';
import { useElementSize } from 'usehooks-ts';


import { defaultValues } from '../..';
import { useSelector } from '../../../../../common/hooks';
import { Genre as GenreType } from '../../../../../common/types';
import { defaultUser, getUser } from '../../../../../store/slices/Users';
import Divider from '../../../../Divider';
import Empty from '../../../../Empty';
import Panel from '../../../../Panel';

import { GenresProps } from './types';
import Genre from './components/Genre';

const Genres = ({ form, mediaType }: GenresProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);
	const allGenres = useSelector(
		(state) => (mediaType === 'movie' ? state.options.data.genres.movie : state.options.data.genres.tv) || []
	);
	const genres = form.watch().genres || [];

	const [ref, { height }] = useElementSize();

	const handleGenreClick = (genre: GenreType): void => {
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
		if (genres.length === allGenres.length) {
			form.setValue('genres', [], { shouldDirty: true });
		} else {
			form.setValue('genres', [...allGenres.map((genre) => genre.id)], { shouldDirty: true });
		}
	};

	const handleAllLabel = (): string => {
		return `${genres.length === allGenres.length ? 'Remove' : 'Select'} All`;
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
											isNil(allGenres) ||
											isEmpty(allGenres) ||
											value.length === 0 ||
											value.length === allGenres.length
										}
										onClick={() =>
											form.setValue('genres', defaultValues.genres, { shouldDirty: true })
										}
										size='sm'
										variant='text'
									>
										Clear
									</Button>
									<Button
										color={color}
										isDisabled={isNil(allGenres) || isEmpty(allGenres)}
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
								{isNil(allGenres) || isEmpty(allGenres) ? (
									<WrapItem width='100%'>
										<Empty
											hasIllustration={false}
											label='Oh no!'
											description='Failed to find any genres!'
											size='sm'
											variant='transparent'
										/>
									</WrapItem>
								) : !(isNil(allGenres) || isEmpty(allGenres)) ? (
									allGenres.map((genre) => (
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
									range(0, 15).map((_dummy, index) => (
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
