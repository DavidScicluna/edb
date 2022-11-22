import { Undefinable } from '@davidscicluna/component-library';

import { useToast } from '@chakra-ui/react';

import {
	UseInfiniteQueryResult,
	UseInfiniteQueryOptions,
	useQueryClient,
	useInfiniteQuery
} from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact } from 'lodash';

import { peopleInfiniteQueryKey } from '../keys';
import { axios } from '../scripts';
import { AxiosConfig, QueryError, Response } from '../types';
import { PartialPerson } from '../types/person';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { Alert } from '../../components';
import { formatMediaTypeLabel } from '../utils';

export type UsePeopleInfiniteQueryResponse = Response<PartialPerson[]>;

export type UsePeopleInfiniteQueryOptions = Omit<
	UseInfiniteQueryOptions<UsePeopleInfiniteQueryResponse, AxiosError<QueryError>>,
	'getPreviousPageParam' | 'getNextPageParam'
>;

export type UsePeopleInfiniteQueryResult = UseInfiniteQueryResult<
	UsePeopleInfiniteQueryResponse,
	AxiosError<QueryError>
>;

type UsePeopleInfiniteQueryParams = Undefinable<{
	config?: AxiosConfig;
	options?: UsePeopleInfiniteQueryOptions;
}>;

const toastID = 'ds-edb-use-people-infinite-query-toast';

const usePeopleInfiniteQuery = ({
	config = {},
	options = {}
}: UsePeopleInfiniteQueryParams = {}): UsePeopleInfiniteQueryResult => {
	const toast = useToast();

	const key = peopleInfiniteQueryKey();

	const client = useQueryClient();
	const infiniteQuery = useInfiniteQuery<UsePeopleInfiniteQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ pageParam = 1, signal }) => {
			const { data } = await axios.get<UsePeopleInfiniteQueryResponse>('/person/popular', {
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
										mediaType: 'person'
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

export default usePeopleInfiniteQuery;
