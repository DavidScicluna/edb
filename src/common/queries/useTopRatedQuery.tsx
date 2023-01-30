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

export type UseTopRatedQueryMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type UseTopRatedQueryProps<MT extends UseTopRatedQueryMediaType> = { mediaType: MT };

export type UseTopRatedQueryResponse<MT extends UseTopRatedQueryMediaType> = Response<
	MT extends 'movie' ? PartialMovie[] : PartialTVShow[]
>;

export type UseTopRatedQueryOptions<MT extends UseTopRatedQueryMediaType> = UseQueryOptions<
	UseTopRatedQueryResponse<MT>,
	AxiosError<QueryError>
>;

export type UseTopRatedQueryResult<MT extends UseTopRatedQueryMediaType> = UseQueryResult<
	UseTopRatedQueryResponse<MT>,
	AxiosError<QueryError>
>;

type UseTopRatedQueryParams<MT extends UseTopRatedQueryMediaType> = {
	props: UseTopRatedQueryProps<MT>;
	config?: AxiosConfig;
	options?: UseTopRatedQueryOptions<MT>;
};

export const topRatedQueryToastID = memoize(
	<MT extends UseTopRatedQueryMediaType>({ mediaType }: UseTopRatedQueryProps<MT>): string =>
		`ds-edb-top-rated-${mediaType}-query-toast`
);
export const topRatedQueryKey = memoize(
	<MT extends UseTopRatedQueryMediaType>({ mediaType }: UseTopRatedQueryProps<MT>): QueryKey => [
		`ds-edb-top-rated-${mediaType}-query`
	]
);

const useTopRatedQuery = <MT extends UseTopRatedQueryMediaType>({
	props: { mediaType },
	config = {},
	options = {}
}: UseTopRatedQueryParams<MT>): UseTopRatedQueryResult<MT> => {
	const toast = useToast();

	const [toastID, setToastID] = useState<string>(topRatedQueryToastID({ mediaType }));
	const [key, setKey] = useState<QueryKey>(topRatedQueryKey({ mediaType }));

	const client = useQueryClient();
	const query = useQuery<UseTopRatedQueryResponse<MT>, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UseTopRatedQueryResponse<MT>>(`/${mediaType}/top_rated`, {
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
									`Unfortunately, something went wrong when trying to fetch top rated ${formatMediaTypeLabel(
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
		const newToastID = topRatedQueryToastID({ mediaType });
		const newKey = topRatedQueryKey({ mediaType });

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

export default useTopRatedQuery;
