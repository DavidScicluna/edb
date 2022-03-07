import { ReactElement, useState, useEffect } from 'react';

import { useMediaQuery } from '@chakra-ui/react';

import sort from 'array-sort';
import _ from 'lodash';

import { KnownForProps, KnownFor as KnownForType } from './types';

import { useSelector } from '../../../../../../../../common/hooks';
import { Credits } from '../../../../../../../../common/types/person';
import { handleReturnDate, handleReturnGenresByID } from '../../../../../../../../common/utils';
import Button from '../../../../../../../../components/Clickable/Button';
import Empty from '../../../../../../../../components/Empty';
import Error from '../../../../../../../../components/Error';
import HorizontalGrid from '../../../../../../../../components/Grid/Horizontal/Default';
import VerticalPoster from '../../../../../../../../components/Poster/Vertical';

/**
 * This method will filter from known for list and will return the 8 most voted movies/tv shows
 *
 * @returns Array of Objects - Known for list
 */
const handleGetKnownFor = (credits?: Credits): KnownForType => {
	return _.uniqBy(
		sort([...(credits?.cast || []), ...(credits?.crew || [])], 'popularity', {
			reverse: true
		}).filter((_item, index) => index < 20),
		'vote_count'
	);
};

const KnownFor = (props: KnownForProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector((state) => state.user.ui.theme.color);

	const { credits, name, isError = false, isSuccess = false, isLoading = false, onChangeTab } = props;

	const [knownFor, setKnownFor] = useState<KnownForType>([]);

	useEffect(() => {
		if (isSuccess) {
			setKnownFor(handleGetKnownFor(credits));
		}
	}, [isSuccess]);

	return (
		<HorizontalGrid
			title='Known for'
			footer={
				<Button
					color={color}
					isFullWidth
					isDisabled={isLoading || isError}
					onClick={() => onChangeTab(1)}
					size={isSm ? 'sm' : 'md'}
					variant='text'
				>
					{`View all ${(credits?.cast?.length || 0) + (credits?.crew?.length || 0)} credits ${
						name && !isSm ? `of "${name}"` : ''
					} `}
				</Button>
			}
			isDisabled={isLoading || (credits?.cast?.length || 0) + (credits?.crew?.length || 0) === 0}
		>
			{isError ? (
				<Error
					label='Oh no! Something went wrong'
					description={`Failed to fetch ${name ? `"${name}"` : ''} known for list!`}
					variant='transparent'
				/>
			) : isSuccess && knownFor && knownFor.length === 0 ? (
				<Empty label={`${name ? `"${name}"` : ''} has no known for credits`} variant='transparent' />
			) : isSuccess && knownFor && knownFor.length > 0 ? (
				knownFor.map((mediaItem) => (
					<VerticalPoster
						key={mediaItem.id}
						width={['185px', '205px', '230px']}
						mediaItem={mediaItem ? { ...mediaItem } : undefined}
						mediaType={mediaItem?.title ? 'movie' : 'tv'}
						image={{
							alt: `${mediaItem?.title || mediaItem?.name || ''} ${
								mediaItem?.title ? 'movie' : 'tv'
							} poster`,
							src: mediaItem?.poster_path || '',
							size: {
								thumbnail: 'w92',
								full: 'original'
							}
						}}
						rating={mediaItem?.vote_average || null}
						title={mediaItem?.title || mediaItem?.name || ''}
						subtitle={_.compact([
							!(
								_.isNil(mediaItem?.release_date || mediaItem?.first_air_date) ||
								_.isEmpty(mediaItem?.release_date || mediaItem?.first_air_date)
							)
								? handleReturnDate(mediaItem?.release_date || mediaItem?.first_air_date || '', 'year')
								: undefined,
							!(_.isNil(mediaItem?.genre_ids) || _.isEmpty(mediaItem?.genre_ids))
								? `${handleReturnGenresByID(
										mediaItem?.genre_ids || [],
										mediaItem?.title ? 'movie' : 'tv'
								  )}`
								: undefined
						]).join(' • ')}
						isLoading={false}
					/>
				))
			) : (
				[..._.range(0, 20)].map((_dummy, index: number) => (
					<VerticalPoster
						key={index}
						width={['185px', '205px', '230px']}
						mediaType='movie'
						title='Media-Item Title'
						isLoading
					/>
				))
			)}
		</HorizontalGrid>
	);
};

export default KnownFor;
