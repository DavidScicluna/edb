import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact } from 'lodash';

import { mediaTypeRecommendationsQueryKey } from '../keys';
import { axios } from '../scripts';
import { AxiosConfig, MediaType, QueryError, Response } from '../types';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { Alert } from '../../components';
import { formatMediaTypeLabel } from '../utils';
import { PartialMovie } from '../types/movie';
import { PartialTV } from '../types/tv';

export type UseMediaTypeRecommendationsQueryMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type UseMediaTypeRecommendationsQueryProps<MT extends UseMediaTypeRecommendationsQueryMediaType> = {
	mediaType: MT;
	id: number;
};

export type UseMediaTypeRecommendationsQueryResponse<MT extends UseMediaTypeRecommendationsQueryMediaType> = Response<
	MT extends 'movie' ? PartialMovie[] : PartialTV[]
>;

export type UseMediaTypeRecommendationsQueryOptions<MT extends UseMediaTypeRecommendationsQueryMediaType> =
	UseQueryOptions<UseMediaTypeRecommendationsQueryResponse<MT>, AxiosError<QueryError>>;

export type UseMediaTypeRecommendationsQueryResult<MT extends UseMediaTypeRecommendationsQueryMediaType> =
	UseQueryResult<UseMediaTypeRecommendationsQueryResponse<MT>, AxiosError<QueryError>>;

type UseMediaTypeRecommendationsQueryParams<MT extends UseMediaTypeRecommendationsQueryMediaType> = {
	props: UseMediaTypeRecommendationsQueryProps<MT>;
	config?: AxiosConfig;
	options?: UseMediaTypeRecommendationsQueryOptions<MT>;
};

const toastID = 'ds-edb-use-media-type-recommendations-query-toast';

const useMediaTypeRecommendationsQuery = <MT extends UseMediaTypeRecommendationsQueryMediaType>({
	props: { mediaType, id },
	config = {},
	options = {}
}: UseMediaTypeRecommendationsQueryParams<MT>): UseMediaTypeRecommendationsQueryResult<MT> => {
	const toast = useToast();

	const key = mediaTypeRecommendationsQueryKey({ mediaType, id });

	const client = useQueryClient();
	const query = useQuery<UseMediaTypeRecommendationsQueryResponse<MT>, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UseMediaTypeRecommendationsQueryResponse<MT>>(
				`/${mediaType}/${id}/recommendations`,
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
									})} recommendations.`,
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

export default useMediaTypeRecommendationsQuery;
