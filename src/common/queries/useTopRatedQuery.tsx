import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { compact } from 'lodash';
import { useWillUnmount } from 'rooks';

import { Alert } from '../../components';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { topRatedQueryKey } from '../keys';
import { axios } from '../scripts';
import { AxiosConfig, MediaType, QueryError, Response } from '../types';
import { PartialMovie } from '../types/movie';
import { PartialTV } from '../types/tv';
import { formatMediaTypeLabel } from '../utils';

export type UseTopRatedQueryMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type UseTopRatedQueryProps = { mediaType: UseTopRatedQueryMediaType };

export type UseTopRatedQueryResponse<MT extends UseTopRatedQueryMediaType> = Response<
	MT extends 'movie' ? PartialMovie[] : PartialTV[]
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
	props: UseTopRatedQueryProps;
	config?: AxiosConfig;
	options?: UseTopRatedQueryOptions<MT>;
};

const toastID = 'ds-edb-use-top-rated-query-toast';

const useTopRatedQuery = <MT extends UseTopRatedQueryMediaType>({
	props: { mediaType },
	config = {},
	options = {}
}: UseTopRatedQueryParams<MT>): UseTopRatedQueryResult<MT> => {
	const toast = useToast();

	const key = topRatedQueryKey({ mediaType });

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

	useWillUnmount(() => client.cancelQueries(key));

	return query;
};

export default useTopRatedQuery;
