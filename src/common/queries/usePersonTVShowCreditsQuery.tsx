import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact } from 'lodash';

import { personTVShowCreditsQueryKey } from '../keys';
import { axios } from '../scripts';
import { AxiosConfig, QueryError } from '../types';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { Alert } from '../../components';
import { FullPerson, TVCredits } from '../types/person';
import { formatMediaTypeLabel } from '../utils';

export type UsePersonTVShowCreditsQueryProps = Pick<FullPerson, 'id'>;

export type UsePersonTVShowCreditsQueryResponse = TVCredits;

export type UsePersonTVShowCreditsQueryOptions = UseQueryOptions<
	UsePersonTVShowCreditsQueryResponse,
	AxiosError<QueryError>
>;

export type UsePersonTVShowCreditsQueryResult = UseQueryResult<
	UsePersonTVShowCreditsQueryResponse,
	AxiosError<QueryError>
>;

type UsePersonTVShowCreditsQueryParams = {
	props: UsePersonTVShowCreditsQueryProps;
	config?: AxiosConfig;
	options?: UsePersonTVShowCreditsQueryOptions;
};

const toastID = 'ds-edb-use-person-tv-show-credits-query-toast';

const usePersonTVShowCreditsQuery = ({
	props: { id },
	config = {},
	options = {}
}: UsePersonTVShowCreditsQueryParams): UsePersonTVShowCreditsQueryResult => {
	const toast = useToast();

	const key = personTVShowCreditsQueryKey({ id });

	const client = useQueryClient();
	const query = useQuery<UsePersonTVShowCreditsQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UsePersonTVShowCreditsQueryResponse>(`/person/${id}/tv_credits`, {
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
									})} ${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })} credits.`,
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

export default usePersonTVShowCreditsQuery;
