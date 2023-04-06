import { useState } from 'react';

import { Alert, utils } from '@davidscicluna/component-library';

import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, QueryKey, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact, memoize } from 'lodash';
import { useUpdateEffect } from 'usehooks-ts';

import { axios } from '../scripts';
import { AxiosConfig, ExternalIDs, MediaType, QueryError } from '../types';
import { formatMediaTypeLabel } from '../utils';

const { convertDurationToMS } = utils;

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

export const externalIDsQueryToastID = memoize(
	({ mediaType, id }: UseExternalIDsQueryProps): string => `ds-edb-${mediaType}-external-ids-${id}-query-toast`
);
export const externalIDsQueryKey = memoize(
	({ mediaType, id }: UseExternalIDsQueryProps): QueryKey => [`ds-edb-${mediaType}-external-ids-${id}-query`]
);

const useExternalIDsQuery = ({
	props: { mediaType, id },
	config = {},
	options = {}
}: UseExternalIDsQueryParams): UseExternalIDsQueryResult => {
	const toast = useToast();

	const [toastID, setToastID] = useState<string>(externalIDsQueryToastID({ mediaType, id }));
	const [key, setKey] = useState<QueryKey>(externalIDsQueryKey({ mediaType, id }));

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
			enabled: String(options.enabled) ? options.enabled : !!id,
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

	useUpdateEffect(() => {
		const newToastID = externalIDsQueryToastID({ mediaType, id });
		const newKey = externalIDsQueryKey({ mediaType, id });

		if (newToastID !== toastID) {
			setToastID(newToastID);
		}

		if (newKey !== key) {
			setKey(newKey);
		}
	}, [mediaType, id]);

	useWillUnmount(() => client.cancelQueries(key));

	return query;
};

export default useExternalIDsQuery;
