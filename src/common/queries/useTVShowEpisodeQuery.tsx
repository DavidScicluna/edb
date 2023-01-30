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
import { TVShowEpisode, TVShowFullSeason, FullTVShow } from '../types/tv';

export type UseTVShowEpisodeQueryProps = Pick<FullTVShow, 'id'> & {
	season: TVShowFullSeason['id'];
	episode: TVShowEpisode['id'];
};

export type UseTVShowEpisodeQueryResponse = TVShowEpisode;

export type UseTVShowEpisodeQueryOptions = UseQueryOptions<UseTVShowEpisodeQueryResponse, AxiosError<QueryError>>;

export type UseTVShowEpisodeQueryResult = UseQueryResult<UseTVShowEpisodeQueryResponse, AxiosError<QueryError>>;

type UseTVShowEpisodeQueryParams = {
	props: UseTVShowEpisodeQueryProps;
	config?: AxiosConfig;
	options?: UseTVShowEpisodeQueryOptions;
};

export const tvShowEpisodeQueryToastID = memoize(
	({ id, season, episode }: UseTVShowEpisodeQueryProps): string =>
		`ds-edb-tv-show-${id}-season-${season}-episode-${episode}-query-toast`
);
export const tvShowEpisodeQueryKey = memoize(
	({ id, season, episode }: UseTVShowEpisodeQueryProps): QueryKey => [
		`ds-edb-tv-show-${id}-season-${season}-episode-${episode}-query`
	]
);

const useTVShowEpisodeQuery = ({
	props: { id, season, episode },
	config = {},
	options = {}
}: UseTVShowEpisodeQueryParams): UseTVShowEpisodeQueryResult => {
	const toast = useToast();

	const [toastID, setToastID] = useState<string>(tvShowEpisodeQueryToastID({ id, season, episode }));
	const [key, setKey] = useState<QueryKey>(tvShowEpisodeQueryKey({ id, season, episode }));

	const client = useQueryClient();
	const query = useQuery<UseTVShowEpisodeQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UseTVShowEpisodeQueryResponse>(
				`/tv/${id}/season/${season}/episode/${episode}`,
				{
					...config,
					signal
				}
			);
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
									})} season: ${season}, episode: ${episode}.`,
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
		const newToastID = tvShowEpisodeQueryToastID({ id, season, episode });
		const newKey = tvShowEpisodeQueryKey({ id, season, episode });

		if (newToastID !== toastID) {
			setToastID(newToastID);
		}

		if (newKey !== key) {
			setKey(newKey);
		}
	}, [id, season, episode]);

	useWillUnmount(() => client.cancelQueries(key));

	return query;
};

export default useTVShowEpisodeQuery;
