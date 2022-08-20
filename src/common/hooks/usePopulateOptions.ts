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
		options: {
			retry: true,
			onSuccess: (countries = []) => dispatch(setCountries([...countries]))
		}
	});

	useJobsQuery({
		options: {
			retry: true,
			onSuccess: (jobs = []) => dispatch(setJobs([...jobs]))
		}
	});

	useLanguagesQuery({
		options: {
			retry: true,
			onSuccess: (languages = []) => dispatch(setLanguages([...languages]))
		}
	});

	useMovieCertificationsQuery({
		options: {
			retry: true,
			onSuccess: (certifications) => dispatch(setMovieCertifications({ ...(certifications || {}) }))
		}
	});

	useMovieGenresQuery({
		options: {
			retry: true,
			onSuccess: ({ genres = [] }) => dispatch(setMovieGenres([...genres]))
		}
	});

	useTVShowGenresQuery({
		options: {
			retry: true,
			onSuccess: ({ genres = [] }) => dispatch(setTVGenres([...genres]))
		}
	});

	useTVShowCertificationsQuery({
		options: {
			retry: true,
			onSuccess: (certifications) => dispatch(setTVCertifications({ ...(certifications || {}) }))
		}
	});
};

export default usePopulateOptions;
