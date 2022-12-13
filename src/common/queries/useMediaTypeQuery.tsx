import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact } from 'lodash';
import { useDispatch } from 'react-redux';

import { mediaTypeQueryKey } from '../keys';
import { axios } from '../scripts';
import { AxiosConfig, MediaType, QueryError } from '../types';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { Alert } from '../../components';
import { FullPerson } from '../types/person';
import { formatMediaTypeLabel } from '../utils';
import { useSelector } from '../hooks';
import { setUserRecentlyViewed, guest } from '../../store/slices/Users';
import { getUpdatedRecentlyViewedList } from '../utils/user';
import { Collection, FullMovie } from '../types/movie';
import { FullTV } from '../types/tv';

export type UseMediaTypeQueryMediaType = Exclude<MediaType, 'company'>;

export type UseMediaTypeQueryProps<MT extends UseMediaTypeQueryMediaType> = { mediaType: MT; id: number };

export type UseMediaTypeQueryResponse<MT extends UseMediaTypeQueryMediaType> = MT extends 'movie'
	? FullMovie
	: MT extends 'tv'
	? FullTV
	: MT extends 'person'
	? FullPerson
	: Collection;

export type UseMediaTypeQueryOptions<MT extends UseMediaTypeQueryMediaType> = UseQueryOptions<
	UseMediaTypeQueryResponse<MT>,
	AxiosError<QueryError>
>;

export type UseMediaTypeQueryResult<MT extends UseMediaTypeQueryMediaType> = UseQueryResult<
	UseMediaTypeQueryResponse<MT>,
	AxiosError<QueryError>
>;

type UseMediaTypeQueryParams<MT extends UseMediaTypeQueryMediaType> = {
	props: UseMediaTypeQueryProps<MT>;
	config?: AxiosConfig;
	options?: UseMediaTypeQueryOptions<MT>;
};

const toastID = 'ds-edb-use-media-type-query-toast';

const useMediaTypeQuery = <MT extends UseMediaTypeQueryMediaType>({
	props: { mediaType, id },
	config = {},
	options = {}
}: UseMediaTypeQueryParams<MT>): UseMediaTypeQueryResult<MT> => {
	const toast = useToast();

	const dispatch = useDispatch();
	const { id: userID, recentlyViewed } = useSelector((state) => state.users.data.activeUser.data);

	const key = mediaTypeQueryKey({ mediaType, id });

	const client = useQueryClient();
	const query = useQuery<UseMediaTypeQueryResponse<MT>, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UseMediaTypeQueryResponse<MT>>(`/${mediaType}/${id}`, {
				...config,
				signal
			});
			return data;
		},
		{
			...options,
			enabled: options.enabled || !!id,
			onSuccess: (data) => {
				if (userID !== guest.data.id) {
					dispatch(
						setUserRecentlyViewed({
							id: userID,
							data: getUpdatedRecentlyViewedList({ recentlyViewed, mediaType, mediaItem: data })
						})
					);
				}

				if (options.onSuccess) {
					options.onSuccess(data);
				}
			},
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
									})}.`,
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

export default useMediaTypeQuery;