import { useState } from 'react';

import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, QueryKey, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact, memoize } from 'lodash';
import { useUpdateEffect } from 'usehooks-ts';

import { axios } from '../scripts';
import { AxiosConfig, QueryError } from '../types';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { Alert } from '../../components';
import { formatMediaTypeLabel } from '../utils';
import { FullSeason, FullTV } from '../types/tv';

export type UseTVShowSeasonQueryProps = Pick<FullTV, 'id'> & { season: FullSeason['id'] };

export type UseTVShowSeasonQueryResponse = FullSeason;

export type UseTVShowSeasonQueryOptions = UseQueryOptions<UseTVShowSeasonQueryResponse, AxiosError<QueryError>>;

export type UseTVShowSeasonQueryResult = UseQueryResult<UseTVShowSeasonQueryResponse, AxiosError<QueryError>>;

type UseTVShowSeasonQueryParams = {
	props: UseTVShowSeasonQueryProps;
	config?: AxiosConfig;
	options?: UseTVShowSeasonQueryOptions;
};

export const tvShowSeasonsQueryToastID = memoize(
	({ id, season }: UseTVShowSeasonQueryProps): string => `ds-edb-tv-show-${id}-season-${season}-query-toast`
);
export const tvShowSeasonsQueryKey = memoize(
	({ id, season }: UseTVShowSeasonQueryProps): QueryKey => [`ds-edb-tv-show-${id}-season-${season}-query`]
);

const useTVShowSeasonQuery = ({
	props: { id, season },
	config = {},
	options = {}
}: UseTVShowSeasonQueryParams): UseTVShowSeasonQueryResult => {
	const toast = useToast();

	const [toastID, setToastID] = useState<string>(tvShowSeasonsQueryToastID({ id, season }));
	const [key, setKey] = useState<QueryKey>(tvShowSeasonsQueryKey({ id, season }));

	const client = useQueryClient();
	const query = useQuery<UseTVShowSeasonQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UseTVShowSeasonQueryResponse>(`/tv/${id}/season/${season}`, {
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
										mediaType: 'tv'
									})} season: ${season}.`,
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
		const newToastID = tvShowSeasonsQueryToastID({ id, season });
		const newKey = tvShowSeasonsQueryKey({ id, season });

		if (newToastID !== toastID) {
			setToastID(newToastID);
		}

		if (newKey !== key) {
			setKey(newKey);
		}
	}, [id, season]);

	useWillUnmount(() => client.cancelQueries(key));

	return query;
};

export default useTVShowSeasonQuery;
