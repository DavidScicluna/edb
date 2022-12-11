import { useToast } from '@chakra-ui/react';

import {
	UseInfiniteQueryResult,
	UseInfiniteQueryOptions,
	useQueryClient,
	useInfiniteQuery
} from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { compact } from 'lodash';
import { useWillUnmount } from 'rooks';

import { Alert } from '../../components';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { mediaTypeInfiniteQueryKey } from '../keys';
import { axios } from '../scripts';
import { AxiosConfig, MediaType, QueryError, Response } from '../types';
import { PartialTV } from '../types/tv';
import { formatMediaTypeLabel } from '../utils';
import { PartialMovie } from '../types/movie';
import { PartialPerson } from '../types/person';

export type UseMediaTypeInfiniteQueryMediaType = Exclude<MediaType, 'company' | 'collection'>;

export type UseMediaTypeInfiniteQueryProps<MT extends UseMediaTypeInfiniteQueryMediaType> = {
	mediaType: MT;
};

export type UseMediaTypeInfiniteQueryResponse<MT extends UseMediaTypeInfiniteQueryMediaType> = Response<
	MT extends 'movie' ? PartialMovie[] : MT extends 'tv' ? PartialTV[] : PartialPerson[]
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

const toastID = 'ds-edb-use-media-type-infinite-query-toast';

const useMediaTypeInfiniteQuery = <MT extends UseMediaTypeInfiniteQueryMediaType>({
	props: { mediaType },
	config = {},
	options = {}
}: UseMediaTypeInfiniteQueryParams<MT>): UseMediaTypeInfiniteQueryResult<MT> => {
	const toast = useToast();

	const key = mediaTypeInfiniteQueryKey({ mediaType });

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

	useWillUnmount(() => client.cancelQueries(key));

	return infiniteQuery;
};

export default useMediaTypeInfiniteQuery;
