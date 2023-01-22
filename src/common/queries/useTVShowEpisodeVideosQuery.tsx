import { useState } from 'react';

import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, QueryKey, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact, memoize } from 'lodash';
import { useUpdateEffect } from 'usehooks-ts';

import { axios } from '../scripts';
import { AxiosConfig, QueryError, Videos } from '../types';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { Alert } from '../../components';
import { formatMediaTypeLabel } from '../utils';
import { Episode, FullSeason, FullTV } from '../types/tv';

export type UseTVShowEpisodeVideosQueryProps = Pick<FullTV, 'id'> & {
	season: FullSeason['id'];
	episode: Episode['id'];
};

export type UseTVShowEpisodeVideosQueryResponse = Videos;

export type UseTVShowEpisodeVideosQueryOptions = UseQueryOptions<
	UseTVShowEpisodeVideosQueryResponse,
	AxiosError<QueryError>
>;

export type UseTVShowEpisodeVideosQueryResult = UseQueryResult<
	UseTVShowEpisodeVideosQueryResponse,
	AxiosError<QueryError>
>;

type UseTVShowEpisodeVideosQueryParams = {
	props: UseTVShowEpisodeVideosQueryProps;
	config?: AxiosConfig;
	options?: UseTVShowEpisodeVideosQueryOptions;
};

export const tvShowEpisodeVideosQueryToastID = memoize(
	({ id, season, episode }: UseTVShowEpisodeVideosQueryProps): string =>
		`ds-edb-tv-show-${id}-season-${season}-episode-${episode}-videos-query-toast`
);
export const tvShowEpisodeVideosQueryKey = memoize(
	({ id, season, episode }: UseTVShowEpisodeVideosQueryProps): QueryKey => [
		`ds-edb-tv-show-${id}-season-${season}-episode-${episode}-videos-query`
	]
);

const useTVShowEpisodeVideosQuery = ({
	props: { id, season, episode },
	config = {},
	options = {}
}: UseTVShowEpisodeVideosQueryParams): UseTVShowEpisodeVideosQueryResult => {
	const toast = useToast();

	const [toastID, setToastID] = useState<string>(tvShowEpisodeVideosQueryToastID({ id, season, episode }));
	const [key, setKey] = useState<QueryKey>(tvShowEpisodeVideosQueryKey({ id, season, episode }));

	const client = useQueryClient();
	const query = useQuery<UseTVShowEpisodeVideosQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UseTVShowEpisodeVideosQueryResponse>(
				`/tv/${id}/season/${season}/episode/${episode}/videos`,
				{
					...config,
					signal
				}
			);
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
										mediaType: 'tv'
									})} season: ${season}, episode: ${episode} videos.`,
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
		const newToastID = tvShowEpisodeVideosQueryToastID({ id, season, episode });
		const newKey = tvShowEpisodeVideosQueryKey({ id, season, episode });

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

export default useTVShowEpisodeVideosQuery;
