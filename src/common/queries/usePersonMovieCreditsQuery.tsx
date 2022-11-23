import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact } from 'lodash';

import { personMovieCreditsQueryKey } from '../keys';
import { axios } from '../scripts';
import { AxiosConfig, QueryError } from '../types';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { Alert } from '../../components';
import { FullPerson, MovieCredits } from '../types/person';
import { formatMediaTypeLabel } from '../utils';

export type UsePersonMovieCreditsQueryProps = Pick<FullPerson, 'id'>;

export type UsePersonMovieCreditsQueryResponse = MovieCredits;

export type UsePersonMovieCreditsQueryOptions = UseQueryOptions<
	UsePersonMovieCreditsQueryResponse,
	AxiosError<QueryError>
>;

export type UsePersonMovieCreditsQueryResult = UseQueryResult<
	UsePersonMovieCreditsQueryResponse,
	AxiosError<QueryError>
>;

type UsePersonMovieCreditsQueryParams = {
	props: UsePersonMovieCreditsQueryProps;
	config?: AxiosConfig;
	options?: UsePersonMovieCreditsQueryOptions;
};

const toastID = 'ds-edb-use-person-movie-credits-query-toast';

const usePersonMovieCreditsQuery = ({
	props: { id },
	config = {},
	options = {}
}: UsePersonMovieCreditsQueryParams): UsePersonMovieCreditsQueryResult => {
	const toast = useToast();

	const key = personMovieCreditsQueryKey({ id });

	const client = useQueryClient();
	const query = useQuery<UsePersonMovieCreditsQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UsePersonMovieCreditsQueryResponse>(`/person/${id}/movie_credits`, {
				...config,
				signal
			});
			return data;
		},
		{
			...options,
			onError: (error) => {
				console.error(error.toJSON());

				const { status_code, status_message } = error.response?.data || {};

				if (!toast.isActive(toastID)) {
					toast({
						id: toastID,
						duration: convertDurationToMS(),
						position: 'bottom-left',
						render: () => (
							<Alert
								duration={12.5}
								description={compact([
									status_code ? `${status_code}.` : null,
									`Unfortunately, something went wrong when trying to fetch ${formatMediaTypeLabel({
										type: 'single',
										mediaType: 'person'
									})} ${formatMediaTypeLabel({ type: 'single', mediaType: 'movie' })} credits.`,
									status_message ? `(${status_message})` : null
								]).join(' ')}
								status='error'
								onClose={() => toast.close(toastID)}
							/>
						)
					});
				}

				if (options.onError) {
					options.onError(error);
				}
			}
		}
	);

	useWillUnmount(() => client.cancelQueries(key));

	return query;
};

export default usePersonMovieCreditsQuery;
