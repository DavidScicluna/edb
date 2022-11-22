import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { compact } from 'lodash';
import { useWillUnmount } from 'rooks';

import { Alert } from '../../components';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { certificationsQueryKey } from '../keys';
import { axios } from '../scripts';
import { AxiosConfig, Certifications, MediaType, QueryError } from '../types';
import { formatMediaTypeLabel } from '../utils';

export type UseCertificationsQueryProps = { mediaType: Exclude<MediaType, 'person' | 'company' | 'collection'> };

export type UseCertificationsQueryResponse = Certifications;

export type UseCertificationsQueryOptions = UseQueryOptions<UseCertificationsQueryResponse, AxiosError<QueryError>>;

export type UseCertificationsQueryResult = UseQueryResult<UseCertificationsQueryResponse, AxiosError<QueryError>>;

type UseCertificationsQueryParams = {
	props: UseCertificationsQueryProps;
	config?: AxiosConfig;
	options?: UseCertificationsQueryOptions;
};

const toastID = 'ds-edb-use-certifications-query-toast';

const useCertificationsQuery = ({
	props: { mediaType },
	config = {},
	options = {}
}: UseCertificationsQueryParams): UseCertificationsQueryResult => {
	const toast = useToast();

	const key = certificationsQueryKey({ mediaType });

	const client = useQueryClient();
	const query = useQuery<UseCertificationsQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UseCertificationsQueryResponse>(`/certification/${mediaType}/list`, {
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
										mediaType
									})} certifications.`,
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

export default useCertificationsQuery;
