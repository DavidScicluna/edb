import { useState } from 'react';

import { Alert, utils } from '@davidscicluna/component-library';

import { useToast } from '@chakra-ui/react';

import {
	UseInfiniteQueryResult,
	UseInfiniteQueryOptions,
	QueryKey,
	useQueryClient,
	useInfiniteQuery
} from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { compact, memoize } from 'lodash';
import { useWillUnmount } from 'rooks';
import { useUpdateEffect } from 'usehooks-ts';

import { axios } from '../scripts';
import { AxiosConfig, MediaType, QueryError, Response } from '../types';
import { PartialTVShow } from '../types/tv';
import { formatMediaTypeLabel } from '../utils';
import { PartialMovie } from '../types/movie';
import { PartialPerson } from '../types/person';

const { convertDurationToMS } = utils;

export type UseMediaTypeInfiniteQueryMediaType = Exclude<MediaType, 'company' | 'collection'>;

export type UseMediaTypeInfiniteQueryProps<MT extends UseMediaTypeInfiniteQueryMediaType> = {
	mediaType: MT;
};

export type UseMediaTypeInfiniteQueryResponse<MT extends UseMediaTypeInfiniteQueryMediaType> = Response<
	MT extends 'movie' ? PartialMovie[] : MT extends 'tv' ? PartialTVShow[] : PartialPerson[]
>;

export type UseMediaTypeInfiniteQueryOptions<MT extends UseMediaTypeInfiniteQueryMediaType> = Omit<
	UseInfiniteQueryOptions<UseMediaTypeInfiniteQueryResponse<MT>, AxiosError<QueryError>>,
	'getPreviousPageParam' | 'getNextPageParam'
>;

export type UseMediaTypeInfiniteQueryResult<MT extends UseMediaTypeInfiniteQueryMediaType> = UseInfiniteQueryResult<
	UseMediaTypeInfiniteQueryResponse<MT>,
	AxiosError<QueryError>
>;

type UseMediaTypeInfiniteQueryParams<MT extends UseMediaTypeInfiniteQueryMediaType> = {
	props: UseMediaTypeInfiniteQueryProps<MT>;
	config?: AxiosConfig;
	options?: UseMediaTypeInfiniteQueryOptions<MT>;
};

export const mediaTypeInfiniteQueryToastID = memoize(
	<MT extends UseMediaTypeInfiniteQueryMediaType>({ mediaType }: UseMediaTypeInfiniteQueryProps<MT>): string =>
		`ds-edb-${mediaType}-infinite-query-toast`
);
export const mediaTypeInfiniteQueryKey = memoize(
	<MT extends UseMediaTypeInfiniteQueryMediaType>({ mediaType }: UseMediaTypeInfiniteQueryProps<MT>): QueryKey => [
		`ds-edb-${mediaType}-infinite-query`
	]
);

const useMediaTypeInfiniteQuery = <MT extends UseMediaTypeInfiniteQueryMediaType>({
	props: { mediaType },
	config = {},
	options = {}
}: UseMediaTypeInfiniteQueryParams<MT>): UseMediaTypeInfiniteQueryResult<MT> => {
	const toast = useToast();

	const [toastID, setToastID] = useState<string>(mediaTypeInfiniteQueryToastID({ mediaType }));
	const [key, setKey] = useState<QueryKey>(mediaTypeInfiniteQueryKey({ mediaType }));

	const client = useQueryClient();
	const infiniteQuery = useInfiniteQuery<UseMediaTypeInfiniteQueryResponse<MT>, AxiosError<QueryError>>(
		key,
		async ({ pageParam = 1, signal }) => {
			const { data } = await axios.get<UseMediaTypeInfiniteQueryResponse<MT>>(
				mediaType === 'person' ? '/person/popular' : `/discover/${mediaType}`,
				{
					...config,
					params: { ...config.params, page: pageParam || 1 },
					signal
				}
			);
			return data;
		},
		{
			...options,
			getPreviousPageParam: (firstPage) => {
				return firstPage.page !== 1 ? (firstPage?.page || 0) - 1 : false;
			},
			getNextPageParam: (lastPage) => {
				return lastPage.page !== lastPage.total_pages ? (lastPage?.page || 0) + 1 : false;
			},
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
										type: 'multiple',
										mediaType
									})}.`,
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
		const newToastID = mediaTypeInfiniteQueryToastID({ mediaType });
		const newKey = mediaTypeInfiniteQueryKey({ mediaType });

		if (newToastID !== toastID) {
			setToastID(newToastID);
		}

		if (newKey !== key) {
			setKey(newKey);
		}
	}, [mediaType]);

	useWillUnmount(() => client.cancelQueries(key));

	return infiniteQuery;
};

export default useMediaTypeInfiniteQuery;
