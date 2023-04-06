import { useState } from 'react';

import { Alert, utils } from '@davidscicluna/component-library';

import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, QueryKey, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact, memoize } from 'lodash';
import { useUpdateEffect } from 'usehooks-ts';

import { axios } from '../scripts';
import { AxiosConfig, Images, MediaType, QueryError } from '../types';
import { formatMediaTypeLabel } from '../utils';

const { convertDurationToMS } = utils;

export type UseMediaTypeImagesQueryMediaType = Exclude<MediaType, 'company'>;

export type UseMediaTypeImagesQueryProps = { mediaType: UseMediaTypeImagesQueryMediaType; id: number };

export type UseMediaTypeImagesQueryResponse = Images;

export type UseMediaTypeImagesQueryOptions = UseQueryOptions<UseMediaTypeImagesQueryResponse, AxiosError<QueryError>>;

export type UseMediaTypeImagesQueryResult = UseQueryResult<UseMediaTypeImagesQueryResponse, AxiosError<QueryError>>;

type UseMediaTypeImagesQueryParams = {
	props: UseMediaTypeImagesQueryProps;
	config?: AxiosConfig;
	options?: UseMediaTypeImagesQueryOptions;
};

export const mediaTypeImagesQueryToastID = memoize(
	({ mediaType, id }: UseMediaTypeImagesQueryProps): string => `ds-edb-${mediaType}-${id}-images-query-toast`
);
export const mediaTypeImagesQueryKey = memoize(
	({ mediaType, id }: UseMediaTypeImagesQueryProps): QueryKey => [`ds-edb-${mediaType}-${id}-images-query`]
);

const useMediaTypeImagesQuery = ({
	props: { mediaType, id },
	config = {},
	options = {}
}: UseMediaTypeImagesQueryParams): UseMediaTypeImagesQueryResult => {
	const toast = useToast();

	const [toastID, setToastID] = useState<string>(mediaTypeImagesQueryToastID({ mediaType, id }));
	const [key, setKey] = useState<QueryKey>(mediaTypeImagesQueryKey({ mediaType, id }));

	const client = useQueryClient();
	const query = useQuery<UseMediaTypeImagesQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UseMediaTypeImagesQueryResponse>(`/${mediaType}/${id}/images`, {
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
									})} photos.`,
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
		const newToastID = mediaTypeImagesQueryToastID({ mediaType, id });
		const newKey = mediaTypeImagesQueryKey({ mediaType, id });

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

export default useMediaTypeImagesQuery;
