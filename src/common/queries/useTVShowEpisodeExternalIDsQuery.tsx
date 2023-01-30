import { useState } from 'react';

import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, QueryKey, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact, memoize } from 'lodash';
import { useUpdateEffect } from 'usehooks-ts';

import { axios } from '../scripts';
import { AxiosConfig, ExternalIDs, QueryError } from '../types';
import { convertDurationToMS } from '../../components/Alert/common/utils';
import { Alert } from '../../components';
import { formatMediaTypeLabel } from '../utils';
import { TVShowEpisode, TVShowFullSeason, FullTVShow } from '../types/tv';

export type UseTVShowEpisodeExternalIDsQueryProps = Pick<FullTVShow, 'id'> & {
	season: TVShowFullSeason['id'];
	episode: TVShowEpisode['id'];
};

export type UseTVShowEpisodeExternalIDsQueryResponse = ExternalIDs;

export type UseTVShowEpisodeExternalIDsQueryOptions = UseQueryOptions<
	UseTVShowEpisodeExternalIDsQueryResponse,
	AxiosError<QueryError>
>;

export type UseTVShowEpisodeExternalIDsQueryResult = UseQueryResult<
	UseTVShowEpisodeExternalIDsQueryResponse,
	AxiosError<QueryError>
>;

type UseTVShowEpisodeExternalIDsQueryParams = {
	props: UseTVShowEpisodeExternalIDsQueryProps;
	config?: AxiosConfig;
	options?: UseTVShowEpisodeExternalIDsQueryOptions;
};

export const tvShowEpisodeExternalIDsQueryToastID = memoize(
	({ id, season, episode }: UseTVShowEpisodeExternalIDsQueryProps): string =>
		`ds-edb-tv-show-${id}-season-${season}-episode-${episode}-external-ids-query-toast`
);
export const tvShowEpisodeExternalIDsQueryKey = memoize(
	({ id, season, episode }: UseTVShowEpisodeExternalIDsQueryProps): QueryKey => [
		`ds-edb-tv-show-${id}-season-${season}-episode-${episode}-external-ids-query`
	]
);

const useTVShowEpisodeExternalIDsQuery = ({
	props: { id, season, episode },
	config = {},
	options = {}
}: UseTVShowEpisodeExternalIDsQueryParams): UseTVShowEpisodeExternalIDsQueryResult => {
	const toast = useToast();

	const [toastID, setToastID] = useState<string>(tvShowEpisodeExternalIDsQueryToastID({ id, season, episode }));
	const [key, setKey] = useState<QueryKey>(tvShowEpisodeExternalIDsQueryKey({ id, season, episode }));

	const client = useQueryClient();
	const query = useQuery<UseTVShowEpisodeExternalIDsQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UseTVShowEpisodeExternalIDsQueryResponse>(
				`/tv/${id}/season/${season}/episode/${episode}/external_ids`,
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
									})} season: ${season}, episode: ${episode} social media links.`,
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
		const newToastID = tvShowEpisodeExternalIDsQueryToastID({ id, season, episode });
		const newKey = tvShowEpisodeExternalIDsQueryKey({ id, season, episode });

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

export default useTVShowEpisodeExternalIDsQuery;
