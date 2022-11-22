import { Undefinable } from '@davidscicluna/component-library';

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
import { tvShowsInfiniteQueryKey } from '../keys';
import { axios } from '../scripts';
import { AxiosConfig, QueryError, Response } from '../types';
import { PartialTV } from '../types/tv';
import { formatMediaTypeLabel } from '../utils';

export type UseTVShowsInfiniteQueryResponse = Response<PartialTV[]>;

export type UseTVShowsInfiniteQueryOptions = Omit<
	UseInfiniteQueryOptions<UseTVShowsInfiniteQueryResponse, AxiosError<QueryError>>,
	'getPreviousPageParam' | 'getNextPageParam'
>;

export type UseTVShowsInfiniteQueryResult = UseInfiniteQueryResult<
	UseTVShowsInfiniteQueryResponse,
	AxiosError<QueryError>
>;

type UseTVShowsInfiniteQueryParams = Undefinable<{
	config?: AxiosConfig;
	options?: UseTVShowsInfiniteQueryOptions;
}>;

const toastID = 'ds-edb-use-tv-shows-infinite-query-toast';

const useTVShowsInfiniteQuery = ({
	config = {},
	options = {}
}: UseTVShowsInfiniteQueryParams = {}): UseTVShowsInfiniteQueryResult => {
	const toast = useToast();

	const key = tvShowsInfiniteQueryKey();

	const client = useQueryClient();
	const infiniteQuery = useInfiniteQuery<UseTVShowsInfiniteQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ pageParam = 1, signal }) => {
			const { data } = await axios.get<UseTVShowsInfiniteQueryResponse>('/discover/tv', {
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
										mediaType: 'tv'
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

export default useTVShowsInfiniteQuery;
