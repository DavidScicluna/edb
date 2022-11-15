import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { compact } from 'lodash';
import { useWillUnmount } from 'rooks';

import { Alert } from '../../components';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { popularQueryKey } from '../keys';
import { axios as axiosInstance } from '../scripts';
import { AxiosConfig, MediaType, QueryError, Response } from '../types';
import { PartialMovie } from '../types/movie';
import { PartialTV } from '../types/tv';
import { formatMediaTypeLabel } from '../utils';

export type UsePopularQueryMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type UsePopularQueryProps = { mediaType: UsePopularQueryMediaType };

export type UsePopularQueryResponse<MT extends UsePopularQueryMediaType> = Response<
	MT extends 'movie' ? PartialMovie[] : PartialTV[]
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
	props: UsePopularQueryProps;
	config?: AxiosConfig;
	options?: UsePopularQueryOptions<MT>;
};

const toastID = 'ds-edb-use-popular-query-toast';

const usePopularQuery = <MT extends UsePopularQueryMediaType>({
	props: { mediaType },
	config = {},
	options = {}
}: UsePopularQueryParams<MT>): UsePopularQueryResult<MT> => {
	const toast = useToast();

	const key = popularQueryKey({ mediaType }) || [`popular_${mediaType}`];

	const client = useQueryClient();
	const query = useQuery<UsePopularQueryResponse<MT>, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axiosInstance.get<UsePopularQueryResponse<MT>>(`/${mediaType}/popular`, {
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

	useWillUnmount(() => client.cancelQueries(key));

	return query;
};

export default usePopularQuery;
