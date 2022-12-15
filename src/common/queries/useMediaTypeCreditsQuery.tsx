import { useState } from 'react';

import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, QueryKey, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact, memoize } from 'lodash';
import { useUpdateEffect } from 'usehooks-ts';

import { axios } from '../scripts';
import { AxiosConfig, MediaType, QueryError } from '../types';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { Alert } from '../../components';
import { formatMediaTypeLabel } from '../utils';
import { Credits as MovieCredits } from '../types/movie';
import { Credits as TVShowCredits } from '../types/tv';

// TODO: GO over all QueryEmpty Try again and check if they are working

export type UseMediaTypeCreditsQueryMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type UseMediaTypeCreditsQueryProps<MT extends UseMediaTypeCreditsQueryMediaType> = { mediaType: MT; id: number };

export type UseMediaTypeCreditsQueryResponse<MT extends UseMediaTypeCreditsQueryMediaType> = MT extends 'movie'
	? MovieCredits
	: TVShowCredits;

export type UseMediaTypeCreditsQueryOptions<MT extends UseMediaTypeCreditsQueryMediaType> = UseQueryOptions<
	UseMediaTypeCreditsQueryResponse<MT>,
	AxiosError<QueryError>
>;

export type UseMediaTypeCreditsQueryResult<MT extends UseMediaTypeCreditsQueryMediaType> = UseQueryResult<
	UseMediaTypeCreditsQueryResponse<MT>,
	AxiosError<QueryError>
>;

type UseMediaTypeCreditsQueryParams<MT extends UseMediaTypeCreditsQueryMediaType> = {
	props: UseMediaTypeCreditsQueryProps<MT>;
	config?: AxiosConfig;
	options?: UseMediaTypeCreditsQueryOptions<MT>;
};

export const mediaTypeCreditsQueryToastID = memoize(
	<MT extends UseMediaTypeCreditsQueryMediaType>({ mediaType, id }: UseMediaTypeCreditsQueryProps<MT>): string =>
		`ds-edb-${mediaType}-${id}-credits-query-toast`
);
export const mediaTypeCreditsQueryKey = memoize(
	<MT extends UseMediaTypeCreditsQueryMediaType>({ mediaType, id }: UseMediaTypeCreditsQueryProps<MT>): QueryKey => [
		`ds-edb-${mediaType}-${id}-credits-query`
	]
);

const useMediaTypeCreditsQuery = <MT extends UseMediaTypeCreditsQueryMediaType>({
	props: { mediaType, id },
	config = {},
	options = {}
}: UseMediaTypeCreditsQueryParams<MT>): UseMediaTypeCreditsQueryResult<MT> => {
	const toast = useToast();

	const [toastID, setToastID] = useState<string>(mediaTypeCreditsQueryToastID({ mediaType, id }));
	const [key, setKey] = useState<QueryKey>(mediaTypeCreditsQueryKey({ mediaType, id }));

	const client = useQueryClient();
	const query = useQuery<UseMediaTypeCreditsQueryResponse<MT>, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UseMediaTypeCreditsQueryResponse<MT>>(`/${mediaType}/${id}/credits`, {
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

	useUpdateEffect(() => {
		const newToastID = mediaTypeCreditsQueryToastID({ mediaType, id });
		const newKey = mediaTypeCreditsQueryKey({ mediaType, id });

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

export default useMediaTypeCreditsQuery;
