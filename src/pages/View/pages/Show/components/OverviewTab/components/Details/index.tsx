import { ReactElement } from 'react';

import { useMediaQuery, Stack } from '@chakra-ui/react';

import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import Label from '../../../../../../components/Hero/components/Label';

import Genres from './components/Genres';
import Language from './components/Language';
import Languages from './components/Languages';
import { DetailsProps, ListItem } from './types';

const Details = ({ show, isLoading = true }: DetailsProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const spokenLanguages = (show?.spoken_languages || []).filter(
		(language) => language.iso_639_1 !== show?.original_language
	);

	const renderDetails: ListItem[] = compact([
		!(isNil(show?.genres) || isEmpty(show?.genres)) || isLoading
			? {
					label: 'Genres',
					children: <Genres key={`tv-show-${show?.id}-genres`} genres={show?.genres} isLoading={isLoading} />
			  }
			: undefined,
		!(isNil(show?.original_language) || isEmpty(show?.original_language)) || isLoading
			? {
					label: (show?.spoken_languages?.length || 0) > 1 ? 'Original Language' : 'Language',
					children: (
						<Language
							key={`tv-show-${show?.id}-language`}
							language={show?.original_language}
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
							key={`tv-show-${show?.id}-languages`}
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
