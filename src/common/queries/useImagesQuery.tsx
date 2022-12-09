import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact } from 'lodash';

import { imagesQueryKey } from '../keys';
import { axios } from '../scripts';
import { AxiosConfig, Images, MediaType, QueryError } from '../types';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { Alert } from '../../components';
import { formatMediaTypeLabel } from '../utils';

export type UseImagesQueryMediaType = Exclude<MediaType, 'company'>;

export type UseImagesQueryProps = { mediaType: UseImagesQueryMediaType; id: number };

export type UseImagesQueryResponse = Images;

export type UseImagesQueryOptions = UseQueryOptions<UseImagesQueryResponse, AxiosError<QueryError>>;

export type UseImagesQueryResult = UseQueryResult<UseImagesQueryResponse, AxiosError<QueryError>>;

type UseImagesQueryParams = {
	props: UseImagesQueryProps;
	config?: AxiosConfig;
	options?: UseImagesQueryOptions;
};

const toastID = 'ds-edb-use-images-query-toast';

const useImagesQuery = ({
	props: { mediaType, id },
	config = {},
	options = {}
}: UseImagesQueryParams): UseImagesQueryResult => {
	const toast = useToast();

	const key = imagesQueryKey({ mediaType, id });

	const client = useQueryClient();
	const query = useQuery<UseImagesQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UseImagesQueryResponse>(`/${mediaType}/${id}/images`, {
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

	useWillUnmount(() => client.cancelQueries(key));

	return query;
};

export default useImagesQuery;
