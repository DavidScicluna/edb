import { useState } from 'react';

import { Alert, utils } from '@davidscicluna/component-library';

import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, QueryKey, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact, memoize } from 'lodash';
import { useUpdateEffect } from 'usehooks-ts';

import { axios } from '../scripts';
import { AxiosConfig, Keyword, MediaType, QueryError } from '../types';
import { formatMediaTypeLabel } from '../utils';

const { convertDurationToMS } = utils;

export type UseMediaTypeKeywordsQueryMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type UseMediaTypeKeywordsQueryProps = { mediaType: UseMediaTypeKeywordsQueryMediaType; id: number };

export type UseMediaTypeKeywordsQueryResponse<MT extends UseMediaTypeKeywordsQueryMediaType> = MT extends 'movie'
	? { id?: number; keywords?: Keyword[] }
	: { id?: number; results?: Keyword[] };

export type UseMediaTypeKeywordsQueryOptions<MT extends UseMediaTypeKeywordsQueryMediaType> = UseQueryOptions<
	UseMediaTypeKeywordsQueryResponse<MT>,
	AxiosError<QueryError>
>;

export type UseMediaTypeKeywordsQueryResult<MT extends UseMediaTypeKeywordsQueryMediaType> = UseQueryResult<
	UseMediaTypeKeywordsQueryResponse<MT>,
	AxiosError<QueryError>
>;

type UseMediaTypeKeywordsQueryParams<MT extends UseMediaTypeKeywordsQueryMediaType> = {
	props: UseMediaTypeKeywordsQueryProps;
	config?: AxiosConfig;
	options?: UseMediaTypeKeywordsQueryOptions<MT>;
};

export const mediaTypeKeywordsQueryToastID = memoize(
	({ mediaType, id }: UseMediaTypeKeywordsQueryProps): string => `ds-edb-${mediaType}-${id}-keywords-query-toast`
);
export const mediaTypeKeywordsQueryKey = memoize(
	({ mediaType, id }: UseMediaTypeKeywordsQueryProps): QueryKey => [`ds-edb-${mediaType}-${id}-keywords-query`]
);

const useMediaTypeKeywordsQuery = <MT extends UseMediaTypeKeywordsQueryMediaType>({
	props: { mediaType, id },
	config = {},
	options = {}
}: UseMediaTypeKeywordsQueryParams<MT>): UseMediaTypeKeywordsQueryResult<MT> => {
	const toast = useToast();

	const [toastID, setToastID] = useState<string>(mediaTypeKeywordsQueryToastID({ mediaType, id }));
	const [key, setKey] = useState<QueryKey>(mediaTypeKeywordsQueryKey({ mediaType, id }));

	const client = useQueryClient();
	const query = useQuery<UseMediaTypeKeywordsQueryResponse<MT>, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UseMediaTypeKeywordsQueryResponse<MT>>(`/${mediaType}/${id}/keywords`, {
				...config,
				signal
			});
			return data;
		},
		{
			...options,
			enabled: String(options.enabled) ? options.enabled : !!id,
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

	useUpdateEffect(() => {
		const newToastID = mediaTypeKeywordsQueryToastID({ mediaType, id });
		const newKey = mediaTypeKeywordsQueryKey({ mediaType, id });

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

export default useMediaTypeKeywordsQuery;
