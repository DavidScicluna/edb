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
import { discoverMediaTypeInfiniteQueryKey } from '../keys';
import { axios } from '../scripts';
import { AxiosConfig, MediaType, QueryError, Response } from '../types';
import { PartialTV } from '../types/tv';
import { formatMediaTypeLabel } from '../utils';
import { PartialMovie } from '../types/movie';

export type UseDiscoverMediaTypeInfiniteQueryMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type UseDiscoverMediaTypeInfiniteQueryProps<MT extends UseDiscoverMediaTypeInfiniteQueryMediaType> = {
	mediaType: MT;
};

export type UseDiscoverMediaTypeInfiniteQueryResponse<MT extends UseDiscoverMediaTypeInfiniteQueryMediaType> = Response<
	MT extends 'movie' ? PartialMovie[] : PartialTV[]
>;

export type UseDiscoverMediaTypeInfiniteQueryOptions<MT extends UseDiscoverMediaTypeInfiniteQueryMediaType> = Omit<
	UseInfiniteQueryOptions<UseDiscoverMediaTypeInfiniteQueryResponse<MT>, AxiosError<QueryError>>,
	'getPreviousPageParam' | 'getNextPageParam'
>;

export type UseDiscoverMediaTypeInfiniteQueryResult<MT extends UseDiscoverMediaTypeInfiniteQueryMediaType> =
	UseInfiniteQueryResult<UseDiscoverMediaTypeInfiniteQueryResponse<MT>, AxiosError<QueryError>>;

type UseDiscoverMediaTypeInfiniteQueryParams<MT extends UseDiscoverMediaTypeInfiniteQueryMediaType> = {
	props: UseDiscoverMediaTypeInfiniteQueryProps<MT>;
	config?: AxiosConfig;
	options?: UseDiscoverMediaTypeInfiniteQueryOptions<MT>;
};

const toastID = 'ds-edb-use-discover-media-type-infinite-query-toast';

const useDiscoverMediaTypeInfiniteQuery = <MT extends UseDiscoverMediaTypeInfiniteQueryMediaType>({
	props: { mediaType },
	config = {},
	options = {}
}: UseDiscoverMediaTypeInfiniteQueryParams<MT>): UseDiscoverMediaTypeInfiniteQueryResult<MT> => {
	const toast = useToast();

	const key = discoverMediaTypeInfiniteQueryKey({ mediaType });

	const client = useQueryClient();
	const infiniteQuery = useInfiniteQuery<UseDiscoverMediaTypeInfiniteQueryResponse<MT>, AxiosError<QueryError>>(
		key,
		async ({ pageParam = 1, signal }) => {
			const { data } = await axios.get<UseDiscoverMediaTypeInfiniteQueryResponse<MT>>('/discover/tv', {
				...config,
				params: { ...config.params, page: pageParam || 1 },
				signal
			});
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

export default useDiscoverMediaTypeInfiniteQuery;
