import { useState } from 'react';

import { Alert, utils } from '@davidscicluna/component-library';

import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, QueryKey, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { compact, memoize } from 'lodash';
import { useWillUnmount } from 'rooks';
import { useUpdateEffect } from 'usehooks-ts';

import { axios } from '../scripts';
import { AxiosConfig, Certifications, MediaType, QueryError } from '../types';
import { formatMediaTypeLabel } from '../utils';

const { convertDurationToMS } = utils;

export type UseCertificationsQueryMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type UseCertificationsQueryProps = { mediaType: UseCertificationsQueryMediaType };

export type UseCertificationsQueryResponse = Certifications;

export type UseCertificationsQueryOptions = UseQueryOptions<UseCertificationsQueryResponse, AxiosError<QueryError>>;

export type UseCertificationsQueryResult = UseQueryResult<UseCertificationsQueryResponse, AxiosError<QueryError>>;

type UseCertificationsQueryParams = {
	props: UseCertificationsQueryProps;
	config?: AxiosConfig;
	options?: UseCertificationsQueryOptions;
};

export const certificationsQueryToastID = memoize(
	({ mediaType }: UseCertificationsQueryProps): string => `ds-edb-${mediaType}-certifications-query-toast`
);
export const certificationsQueryKey = memoize(
	({ mediaType }: UseCertificationsQueryProps): QueryKey => [`ds-edb-${mediaType}-certifications-query`]
);

const useCertificationsQuery = ({
	props: { mediaType },
	config = {},
	options = {}
}: UseCertificationsQueryParams): UseCertificationsQueryResult => {
	const toast = useToast();

	const [toastID, setToastID] = useState<string>(certificationsQueryToastID({ mediaType }));
	const [key, setKey] = useState<QueryKey>(certificationsQueryKey({ mediaType }));

	const client = useQueryClient();
	const query = useQuery<UseCertificationsQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UseCertificationsQueryResponse>(`/certification/${mediaType}/list`, {
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
										mediaType
									})} certifications.`,
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
		const newToastID = certificationsQueryToastID({ mediaType });
		const newKey = certificationsQueryKey({ mediaType });

		if (newToastID !== toastID) {
			setToastID(newToastID);
		}

		if (newKey !== key) {
			setKey(newKey);
		}
	}, [mediaType]);

	useWillUnmount(() => client.cancelQueries(key));

	return query;
};

export default useCertificationsQuery;
