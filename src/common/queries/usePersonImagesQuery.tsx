import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact } from 'lodash';

import { personImagesQueryKey } from '../keys';
import { axios } from '../scripts';
import { AxiosConfig, Images, QueryError } from '../types';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { Alert } from '../../components';
import { FullPerson } from '../types/person';
import { formatMediaTypeLabel } from '../utils';

export type UsePersonImagesQueryProps = Pick<FullPerson, 'id'>;

export type UsePersonImagesQueryResponse = Images;

export type UsePersonImagesQueryOptions = UseQueryOptions<UsePersonImagesQueryResponse, AxiosError<QueryError>>;

export type UsePersonImagesQueryResult = UseQueryResult<UsePersonImagesQueryResponse, AxiosError<QueryError>>;

type UsePersonImagesQueryParams = {
	props: UsePersonImagesQueryProps;
	config?: AxiosConfig;
	options?: UsePersonImagesQueryOptions;
};

const toastID = 'ds-edb-use-person-images-query-toast';

const usePersonImagesQuery = ({
	props: { id },
	config = {},
	options = {}
}: UsePersonImagesQueryParams): UsePersonImagesQueryResult => {
	const toast = useToast();

	const key = personImagesQueryKey({ id });

	const client = useQueryClient();
	const query = useQuery<UsePersonImagesQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UsePersonImagesQueryResponse>(`/person/${id}/images`, {
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
									`Unfortunately, something went wrong when trying to fetch ${formatMediaTypeLabel({
										type: 'single',
										mediaType: 'person'
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

export default usePersonImagesQuery;
