import { ReactElement } from 'react';

import { useMediaQuery, Stack } from '@chakra-ui/react';

import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import Budget from './components/Budget';
import Genres from './components/Genres';
import Language from './components/Language';
import Languages from './components/Languages';
import Revenue from './components/Revenue';
import { DetailsProps, ListItem } from './types';

import Label from '../../../../../../components/Hero/components/Label';

const Details = ({ movie, isLoading = true }: DetailsProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const spokenLanguages = (movie?.spoken_languages || []).filter(
		(language) => language.iso_639_1 !== movie?.original_language
	);

	const renderDetails: ListItem[] = compact([
		!(isNil(movie?.budget) || isEmpty(String(movie?.budget))) || isLoading
			? {
					label: 'Budget',
					children: <Budget key={`movie-${movie?.id}-budget`} budget={movie?.budget} isLoading={isLoading} />
			  }
			: undefined,
		!(isNil(movie?.revenue) || isEmpty(String(movie?.revenue))) || isLoading
			? {
					label: 'Revenue',
					children: (
						<Revenue key={`movie-${movie?.id}-revenue`} revenue={movie?.revenue} isLoading={isLoading} />
					)
			  }
			: undefined,
		!(isNil(movie?.genres) || isEmpty(movie?.genres)) || isLoading
			? {
					label: 'Genres',
					children: <Genres genres={movie?.genres} isLoading={isLoading} />
			  }
			: undefined,
		!(isNil(movie?.original_language) || isEmpty(movie?.original_language)) || isLoading
			? {
					label: (movie?.spoken_languages?.length || 0) > 1 ? 'Original Language' : 'Language',
					children: (
						<Language
							key={`movie-${movie?.id}-language`}
							language={movie?.original_language}
							isLoading={isLoading}
						/>
					)
			  }
			: undefined,
		!(isNil(spokenLanguages) || isEmpty(spokenLanguages)) || isLoading
			? {
					label: 'Other Languages',
					children: (
						<Languages
							key={`movie-${movie?.id}-languages`}
							languages={spokenLanguages}
							isLoading={isLoading}
						/>
					)
			  }
			: undefined
	]);

	return (
		<Stack
			width='100%'
			maxWidth='100%'
			alignItems='stretch'
			justifyContent='stretch'
			direction={isSm ? 'column' : 'row'}
			spacing={isSm ? 2 : 4}
		>
			{renderDetails.map((detail, index: number) =>
				detail.children ? (
					<Label
						key={index}
						width={isSm ? '100%' : 'auto'}
						maxWidth={isSm ? '100%' : `${100 / renderDetails.length}%`}
						flex={1}
						label={detail.label}
					>
						{detail.children}
					</Label>
				) : null
			)}
		</Stack>
	);
};

export default Details;
