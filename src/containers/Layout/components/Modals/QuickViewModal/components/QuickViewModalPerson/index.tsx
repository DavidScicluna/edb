import { FC, useState } from 'react';

import { useDebounce } from '@davidscicluna/component-library';

import { CastMovieCredit, CastTVCredit, CrewMovieCredit, CrewTVCredit } from '../../../../../../../common/types/person';
import { useMediaTypeImagesQuery, useMediaTypeQuery, usePersonCreditsQuery } from '../../../../../../../common/queries';
import QuickViewModalDummyPoster from '../QuickViewModalDummyPoster';
import QuickViewModalStructure from '../QuickViewModalStructure';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';
import QuickViewModalError from '../QuickViewModalError';
import QuickViewModalEmpty from '../QuickViewModalEmpty';
import {
	PersonMovieDepartments,
	PersonTVShowDepartments
} from '../../../../../../../pages/View/pages/Persons/OriginalPerson/types';
import { getDepartments } from '../../../../../../../pages/View/pages/Persons/OriginalPerson/common/utils';

import QuickViewModalPersonContent from './components/QuickViewModalPersonContent';
import QuickViewModalPersonPoster from './components/QuickViewModalPersonPoster';
import { QuickViewModalPersonProps } from './types';
import QuickViewModalPersonDummyContent from './components/QuickViewModalPersonDummyContent';

const QuickViewModalPerson: FC<QuickViewModalPersonProps> = ({ id }) => {
	const [movieDepartments, setMovieDepartments] = useState<PersonMovieDepartments>([]);
	const movieDepartmentsDebounced = useDebounce<PersonMovieDepartments>(movieDepartments);
	const [tvShowDepartments, setTVShowDepartments] = useState<PersonTVShowDepartments>([]);
	const tvShowDepartmentsDebounced = useDebounce<PersonTVShowDepartments>(tvShowDepartments);

	const personQuery = useMediaTypeQuery<'person'>({ props: { mediaType: 'person', id: Number(id) } });

	const {
		data: person,
		isFetching: isPersonFetching,
		isLoading: isPersonLoading,
		isError: isPersonError,
		isSuccess: isPersonSuccess,
		error: personError,
		refetch: refetchPerson
	} = personQuery;

	const { name } = person || {};

	const movieCreditsQuery = usePersonCreditsQuery<'movie'>({
		props: { mediaType: 'movie', id: Number(id) },
		options: {
			enabled: !!person?.id,
			onSuccess: (credits) => {
				setMovieDepartments([...getDepartments<CastMovieCredit, CrewMovieCredit>({ credits })]);
			}
		}
	});

	const { data: movieCredits } = movieCreditsQuery;

	const tvShowCreditsQuery = usePersonCreditsQuery<'tv'>({
		props: { mediaType: 'tv', id: Number(id) },
		options: {
			enabled: !!person?.id,
			onSuccess: (credits) => {
				setTVShowDepartments([...getDepartments<CastTVCredit, CrewTVCredit>({ credits })]);
			}
		}
	});

	const { data: tvShowCredits } = tvShowCreditsQuery;

	const imagesQuery = useMediaTypeImagesQuery({
		props: { mediaType: 'person', id: Number(id) },
		options: { enabled: !!person?.id }
	});

	const { profiles = [] } = imagesQuery.data || {};

	return !(isPersonFetching || isPersonLoading) && isPersonError ? (
		<QuickViewModalError
			{...(personError.response?.data || {})}
			label={name ? name : formatMediaTypeLabel({ type: 'single', mediaType: 'person' })}
			refetch={refetchPerson}
		/>
	) : !(isPersonFetching || isPersonLoading) && isPersonSuccess && !person ? (
		<QuickViewModalEmpty label={name ? name : formatMediaTypeLabel({ type: 'single', mediaType: 'person' })} />
	) : !(isPersonFetching || isPersonLoading) && isPersonSuccess && !!person ? (
		<QuickViewModalStructure
			renderPoster={() => <QuickViewModalPersonPoster person={person} />}
			renderContent={() => (
				<QuickViewModalPersonContent
					person={person}
					movieCredits={movieCredits}
					movieDepartments={movieDepartmentsDebounced}
					tvShowCredits={tvShowCredits}
					tvShowDepartments={tvShowDepartmentsDebounced}
				/>
			)}
		/>
	) : (
		<QuickViewModalStructure
			renderPoster={() => <QuickViewModalDummyPoster />}
			renderContent={() => <QuickViewModalPersonDummyContent />}
		/>
	);
};

export default QuickViewModalPerson;
