import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact } from 'lodash';

import { personCreditsQueryKey } from '../keys';
import { axios } from '../scripts';
import { AxiosConfig, MediaType, QueryError } from '../types';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { Alert } from '../../components';
import { FullPerson, MovieCredits, TVCredits } from '../types/person';
import { formatMediaTypeLabel } from '../utils';

export type UsePersonCreditsQueryMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type UsePersonCreditsQueryProps<MT extends UsePersonCreditsQueryMediaType> = Pick<FullPerson, 'id'> & {
	mediaType: MT;
};

export type UsePersonCreditsQueryResponse<MT extends UsePersonCreditsQueryMediaType> = MT extends 'movie'
	? MovieCredits
	: TVCredits;

export type UsePersonCreditsQueryOptions<MT extends UsePersonCreditsQueryMediaType> = UseQueryOptions<
	UsePersonCreditsQueryResponse<MT>,
	AxiosError<QueryError>
>;

export type UsePersonCreditsQueryResult<MT extends UsePersonCreditsQueryMediaType> = UseQueryResult<
	UsePersonCreditsQueryResponse<MT>,
	AxiosError<QueryError>
>;

type UsePersonCreditsQueryParams<MT extends UsePersonCreditsQueryMediaType> = {
	props: UsePersonCreditsQueryProps<MT>;
	config?: AxiosConfig;
	options?: UsePersonCreditsQueryOptions<MT>;
};

const toastID = 'ds-edb-use-person-credits-query-toast';

const usePersonCreditsQuery = <MT extends UsePersonCreditsQueryMediaType>({
	props: { mediaType, id },
	config = {},
	options = {}
}: UsePersonCreditsQueryParams<MT>): UsePersonCreditsQueryResult<MT> => {
	const toast = useToast();

	const key = personCreditsQueryKey({ mediaType, id });

	const client = useQueryClient();
	const query = useQuery<UsePersonCreditsQueryResponse<MT>, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UsePersonCreditsQueryResponse<MT>>(`/person/${id}/${mediaType}_credits`, {
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
										mediaType: 'person'
									})} ${formatMediaTypeLabel({ type: 'single', mediaType })} credits.`,
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

export default usePersonCreditsQuery;
