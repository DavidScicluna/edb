import { useDispatch } from 'react-redux';

import {
	setCountries,
	setJobs,
	setLanguages,
	setMovieCertifications,
	setMovieGenres,
	setTVShowCertifications,
	setTVShowGenres
} from '../../store/slices/Options';
import { useCertificationsQuery, useCountriesQuery, useGenresQuery, useJobsQuery, useLanguagesQuery } from '../queries';

const usePopulateOptions = (): void => {
	const dispatch = useDispatch();

	useCountriesQuery({
		options: { onSuccess: (countries = []) => dispatch(setCountries([...countries])) }
	});

	useJobsQuery({
		options: { onSuccess: (jobs = []) => dispatch(setJobs([...jobs])) }
	});

	useLanguagesQuery({
		options: { onSuccess: (languages = []) => dispatch(setLanguages([...languages])) }
	});

	useCertificationsQuery({
		props: { mediaType: 'movie' },
		options: { onSuccess: (certifications) => dispatch(setMovieCertifications({ ...(certifications || {}) })) }
	});

	useGenresQuery({
		props: { mediaType: 'movie' },
		options: { onSuccess: ({ genres = [] }) => dispatch(setMovieGenres([...genres])) }
	});

	useCertificationsQuery({
		props: { mediaType: 'tv' },
		options: { onSuccess: (certifications) => dispatch(setTVShowCertifications({ ...(certifications || {}) })) }
	});

	useGenresQuery({
		props: { mediaType: 'tv' },
		options: { onSuccess: ({ genres = [] }) => dispatch(setTVShowGenres([...genres])) }
	});
};

export default usePopulateOptions;
