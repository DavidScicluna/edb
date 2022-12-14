import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact } from 'lodash';

import { mediaTypeKeywordsQueryKey } from '../keys';
import { axios } from '../scripts';
import { AxiosConfig, Keywords, MediaType, QueryError } from '../types';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { Alert } from '../../components';
import { formatMediaTypeLabel } from '../utils';

export type UseMediaTypeKeywordsQueryMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type UseMediaTypeKeywordsQueryProps = { mediaType: UseMediaTypeKeywordsQueryMediaType; id: number };

export type UseMediaTypeKeywordsQueryResponse = Keywords;

export type UseMediaTypeKeywordsQueryOptions = UseQueryOptions<
	UseMediaTypeKeywordsQueryResponse,
	AxiosError<QueryError>
>;

export type UseMediaTypeKeywordsQueryResult = UseQueryResult<UseMediaTypeKeywordsQueryResponse, AxiosError<QueryError>>;

type UseMediaTypeKeywordsQueryParams = {
	props: UseMediaTypeKeywordsQueryProps;
	config?: AxiosConfig;
	options?: UseMediaTypeKeywordsQueryOptions;
};

const toastID = 'ds-edb-use-media-type-keywords-query-toast';

const useMediaTypeKeywordsQuery = ({
	props: { mediaType, id },
	config = {},
	options = {}
}: UseMediaTypeKeywordsQueryParams): UseMediaTypeKeywordsQueryResult => {
	const toast = useToast();

	const key = mediaTypeKeywordsQueryKey({ mediaType, id });

	const client = useQueryClient();
	const query = useQuery<UseMediaTypeKeywordsQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UseMediaTypeKeywordsQueryResponse>(`/${mediaType}/${id}/keywords`, {
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
									})} keywords.`,
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

export default useMediaTypeKeywordsQuery;
