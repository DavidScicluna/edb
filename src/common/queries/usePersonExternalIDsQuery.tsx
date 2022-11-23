import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact } from 'lodash';

import { personExternalIDsQueryKey } from '../keys';
import { axios } from '../scripts';
import { AxiosConfig, ExternalIDs, QueryError } from '../types';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { Alert } from '../../components';
import { FullPerson } from '../types/person';
import { formatMediaTypeLabel } from '../utils';

export type UsePersonExternalIDsQueryProps = Pick<FullPerson, 'id'>;

export type UsePersonExternalIDsQueryResponse = ExternalIDs;

export type UsePersonExternalIDsQueryOptions = UseQueryOptions<
	UsePersonExternalIDsQueryResponse,
	AxiosError<QueryError>
>;

export type UsePersonExternalIDsQueryResult = UseQueryResult<UsePersonExternalIDsQueryResponse, AxiosError<QueryError>>;

type UsePersonExternalIDsQueryParams = {
	props: UsePersonExternalIDsQueryProps;
	config?: AxiosConfig;
	options?: UsePersonExternalIDsQueryOptions;
};

const toastID = 'ds-edb-use-person-external-ids-query-toast';

const usePersonExternalIDsQuery = ({
	props: { id },
	config = {},
	options = {}
}: UsePersonExternalIDsQueryParams): UsePersonExternalIDsQueryResult => {
	const toast = useToast();

	const key = personExternalIDsQueryKey({ id });

	const client = useQueryClient();
	const query = useQuery<UsePersonExternalIDsQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UsePersonExternalIDsQueryResponse>(`/person/${id}/external_ids`, {
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
									})} social media links.`,
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

export default usePersonExternalIDsQuery;
