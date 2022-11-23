import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact } from 'lodash';
import { useDispatch } from 'react-redux';

import { personQueryKey } from '../keys';
import { axios } from '../scripts';
import { AxiosConfig, QueryError } from '../types';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { Alert } from '../../components';
import { FullPerson } from '../types/person';
import { formatMediaTypeLabel } from '../utils';
import { useSelector } from '../hooks';
import { setUserRecentlyViewed, guest } from '../../store/slices/Users';
import { getUpdatedRecentlyViewedList } from '../utils/user';

export type UsePersonQueryProps = Pick<FullPerson, 'id'>;

export type UsePersonQueryResponse = FullPerson;

export type UsePersonQueryOptions = UseQueryOptions<UsePersonQueryResponse, AxiosError<QueryError>>;

export type UsePersonQueryResult = UseQueryResult<UsePersonQueryResponse, AxiosError<QueryError>>;

type UsePersonQueryParams = {
	props: UsePersonQueryProps;
	config?: AxiosConfig;
	options?: UsePersonQueryOptions;
};

const toastID = 'ds-edb-use-person-query-toast';

const usePersonQuery = ({ props: { id }, config = {}, options = {} }: UsePersonQueryParams): UsePersonQueryResult => {
	const toast = useToast();

	const dispatch = useDispatch();
	const { id: userID, recentlyViewed } = useSelector((state) => state.users.data.activeUser.data);

	const key = personQueryKey({ id });

	const client = useQueryClient();
	const query = useQuery<UsePersonQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UsePersonQueryResponse>(`/person/${id}`, {
				...config,
				signal
			});
			return data;
		},
		{
			...options,
			onSuccess: (data) => {
				if (userID !== guest.data.id) {
					dispatch(
						setUserRecentlyViewed({
							id: userID,
							data: getUpdatedRecentlyViewedList({ recentlyViewed, mediaType: 'person', mediaItem: data })
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
										mediaType: 'person'
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

export default usePersonQuery;
