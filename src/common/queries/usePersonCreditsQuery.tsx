import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact } from 'lodash';

import { personCreditsQueryKey } from '../keys';
import { axios } from '../scripts';
import { AxiosConfig, QueryError } from '../types';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { Alert } from '../../components';
import { Credits, FullPerson } from '../types/person';
import { formatMediaTypeLabel } from '../utils';

export type UsePersonCreditsQueryProps = Pick<FullPerson, 'id'>;

export type UsePersonCreditsQueryResponse = Credits;

export type UsePersonCreditsQueryOptions = UseQueryOptions<UsePersonCreditsQueryResponse, AxiosError<QueryError>>;

export type UsePersonCreditsQueryResult = UseQueryResult<UsePersonCreditsQueryResponse, AxiosError<QueryError>>;

type UsePersonCreditsQueryParams = {
	props: UsePersonCreditsQueryProps;
	config?: AxiosConfig;
	options?: UsePersonCreditsQueryOptions;
};

const toastID = 'ds-edb-use-person-credits-query-toast';

const usePersonCreditsQuery = ({
	props: { id },
	config = {},
	options = {}
}: UsePersonCreditsQueryParams): UsePersonCreditsQueryResult => {
	const toast = useToast();

	const key = personCreditsQueryKey({ id });

	const client = useQueryClient();
	const query = useQuery<UsePersonCreditsQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UsePersonCreditsQueryResponse>(`/person/${id}/combined_credits`, {
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
									})} credits.`,
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

export default usePersonCreditsQuery;
