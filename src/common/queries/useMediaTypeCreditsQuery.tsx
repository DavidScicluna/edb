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

const defaultIsAggregated = false;

// TODO: GO over all QueryEmpty Try again and check if they are working
export type UseMediaTypeCreditsQueryMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type UseMediaTypeCreditsQueryProps<MT extends UseMediaTypeCreditsQueryMediaType> = {
	mediaType: MT;
	id: number;
	isAggregated?: boolean;
};

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

const handleCheckIsAggregated = memoize(
	<MT extends UseMediaTypeCreditsQueryMediaType>(
		props: Pick<UseMediaTypeCreditsQueryProps<MT>, 'mediaType' | 'isAggregated'>
	): string => {
		const { mediaType, isAggregated = defaultIsAggregated } = props;
		return mediaType === 'tv' && isAggregated ? 'aggregate_credits' : 'credits';
	}
);

export const mediaTypeCreditsQueryToastID = memoize(
	<MT extends UseMediaTypeCreditsQueryMediaType>(props: UseMediaTypeCreditsQueryProps<MT>): string => {
		const { mediaType, id, isAggregated = defaultIsAggregated } = props;
		return `ds-edb-${mediaType}-${id}-${handleCheckIsAggregated({ mediaType, isAggregated })}-query-toast`;
	}
);
export const mediaTypeCreditsQueryKey = memoize(
	<MT extends UseMediaTypeCreditsQueryMediaType>(props: UseMediaTypeCreditsQueryProps<MT>): QueryKey => {
		const { mediaType, id, isAggregated = defaultIsAggregated } = props;
		return [`ds-edb-${mediaType}-${id}-${handleCheckIsAggregated({ mediaType, isAggregated })}-query`];
	}
);

const useMediaTypeCreditsQuery = <MT extends UseMediaTypeCreditsQueryMediaType>({
	props: { mediaType, id, isAggregated = defaultIsAggregated },
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
			const { data } = await axios.get<UseMediaTypeCreditsQueryResponse<MT>>(
				`/${mediaType}/${id}/${handleCheckIsAggregated({ mediaType, isAggregated })}`,
				{
					...config,
					signal
				}
			);
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
