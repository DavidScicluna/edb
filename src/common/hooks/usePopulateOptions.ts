import { useDispatch } from 'react-redux';

import {
	setCountries,
	setJobs,
	setLanguages,
	setMovieCertifications,
	setMovieGenres,
	setTVCertifications,
	setTVGenres
} from '../../store/slices/Options';
import {
	useCountriesQuery,
	useJobsQuery,
	useLanguagesQuery,
	useMovieCertificationsQuery,
	useMovieGenresQuery,
	useTVShowCertificationsQuery,
	useTVShowGenresQuery
} from '../queries';

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

	useMovieCertificationsQuery({
		options: { onSuccess: (certifications) => dispatch(setMovieCertifications({ ...(certifications || {}) })) }
	});

	useMovieGenresQuery({
		options: { onSuccess: ({ genres = [] }) => dispatch(setMovieGenres([...genres])) }
	});

	useTVShowCertificationsQuery({
		options: { onSuccess: (certifications) => dispatch(setTVCertifications({ ...(certifications || {}) })) }
	});

	useTVShowGenresQuery({
		options: { onSuccess: ({ genres = [] }) => dispatch(setTVGenres([...genres])) }
	});
};

export default usePopulateOptions;
