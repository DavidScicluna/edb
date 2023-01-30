import { useState } from 'react';

import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, QueryKey, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { compact, memoize } from 'lodash';
import { useWillUnmount } from 'rooks';
import { useUpdateEffect } from 'usehooks-ts';

import { Alert } from '../../components';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { axios } from '../scripts';
import { AxiosConfig, MediaType, QueryError, Response } from '../types';
import { PartialMovie } from '../types/movie';
import { PartialTVShow } from '../types/tv';
import { formatMediaTypeLabel } from '../utils';

export type UsePopularQueryMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type UsePopularQueryProps<MT extends UsePopularQueryMediaType> = { mediaType: MT };

export type UsePopularQueryResponse<MT extends UsePopularQueryMediaType> = Response<
	MT extends 'movie' ? PartialMovie[] : PartialTVShow[]
>;

export type UsePopularQueryOptions<MT extends UsePopularQueryMediaType> = UseQueryOptions<
	UsePopularQueryResponse<MT>,
	AxiosError<QueryError>
>;

export type UsePopularQueryResult<MT extends UsePopularQueryMediaType> = UseQueryResult<
	UsePopularQueryResponse<MT>,
	AxiosError<QueryError>
>;

type UsePopularQueryParams<MT extends UsePopularQueryMediaType> = {
	props: UsePopularQueryProps<MT>;
	config?: AxiosConfig;
	options?: UsePopularQueryOptions<MT>;
};

export const popularQueryToastID = memoize(
	<MT extends UsePopularQueryMediaType>({ mediaType }: UsePopularQueryProps<MT>): string =>
		`ds-edb-popular-${mediaType}-query-toast`
);
export const popularQueryKey = memoize(
	<MT extends UsePopularQueryMediaType>({ mediaType }: UsePopularQueryProps<MT>): QueryKey => [
		`ds-edb-popular-${mediaType}-query`
	]
);

const usePopularQuery = <MT extends UsePopularQueryMediaType>({
	props: { mediaType },
	config = {},
	options = {}
}: UsePopularQueryParams<MT>): UsePopularQueryResult<MT> => {
	const toast = useToast();

	const [toastID, setToastID] = useState<string>(popularQueryToastID({ mediaType }));
	const [key, setKey] = useState<QueryKey>(popularQueryKey({ mediaType }));

	const client = useQueryClient();
	const query = useQuery<UsePopularQueryResponse<MT>, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UsePopularQueryResponse<MT>>(`/${mediaType}/popular`, {
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
									`Unfortunately, something went wrong when trying to fetch popular ${formatMediaTypeLabel(
										{ type: 'multiple', mediaType }
									)}.`,
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
		const newToastID = popularQueryToastID({ mediaType });
		const newKey = popularQueryKey({ mediaType });

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

export default usePopularQuery;
