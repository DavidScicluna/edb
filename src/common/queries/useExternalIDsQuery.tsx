import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact } from 'lodash';

import { externalIDsQueryKey } from '../keys';
import { axios } from '../scripts';
import { AxiosConfig, ExternalIDs, MediaType, QueryError } from '../types';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { Alert } from '../../components';
import { formatMediaTypeLabel } from '../utils';

export type UseExternalIDsQueryMediaType = Exclude<MediaType, 'company' | 'collection'>;

export type UseExternalIDsQueryProps = { mediaType: UseExternalIDsQueryMediaType; id: number };

export type UseExternalIDsQueryResponse = ExternalIDs;

export type UseExternalIDsQueryOptions = UseQueryOptions<UseExternalIDsQueryResponse, AxiosError<QueryError>>;

export type UseExternalIDsQueryResult = UseQueryResult<UseExternalIDsQueryResponse, AxiosError<QueryError>>;

type UseExternalIDsQueryParams = {
	props: UseExternalIDsQueryProps;
	config?: AxiosConfig;
	options?: UseExternalIDsQueryOptions;
};

const toastID = 'ds-edb-use-external-ids-query-toast';

const useExternalIDsQuery = ({
	props: { mediaType, id },
	config = {},
	options = {}
}: UseExternalIDsQueryParams): UseExternalIDsQueryResult => {
	const toast = useToast();

	const key = externalIDsQueryKey({ mediaType, id });

	const client = useQueryClient();
	const query = useQuery<UseExternalIDsQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UseExternalIDsQueryResponse>(`/${mediaType}/${id}/external_ids`, {
				...config,
				signal
			});
			return data;
		},
		{
			...options,
			enabled: options.enabled || !!id,
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
										mediaType
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

export default useExternalIDsQuery;
