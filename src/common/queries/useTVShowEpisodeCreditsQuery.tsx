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
import { Episode, EpisodeCredits, FullSeason, FullTV } from '../types/tv';

export type UseTVShowEpisodeCreditsQueryProps = Pick<FullTV, 'id'> & {
	season: FullSeason['id'];
	episode: Episode['id'];
};

export type UseTVShowEpisodeCreditsQueryResponse = EpisodeCredits;

export type UseTVShowEpisodeCreditsQueryOptions = UseQueryOptions<
	UseTVShowEpisodeCreditsQueryResponse,
	AxiosError<QueryError>
>;

export type UseTVShowEpisodeCreditsQueryResult = UseQueryResult<
	UseTVShowEpisodeCreditsQueryResponse,
	AxiosError<QueryError>
>;

type UseTVShowEpisodeCreditsQueryParams = {
	props: UseTVShowEpisodeCreditsQueryProps;
	config?: AxiosConfig;
	options?: UseTVShowEpisodeCreditsQueryOptions;
};

export const tvShowEpisodeCreditsQueryToastID = memoize(
	({ id, season, episode }: UseTVShowEpisodeCreditsQueryProps): string =>
		`ds-edb-tv-show-${id}-season-${season}-episode-${episode}-credits-query-toast`
);
export const tvShowEpisodeCreditsQueryKey = memoize(
	({ id, season, episode }: UseTVShowEpisodeCreditsQueryProps): QueryKey => [
		`ds-edb-tv-show-${id}-season-${season}-episode-${episode}-credits-query`
	]
);

const useTVShowEpisodeCreditsQuery = ({
	props: { id, season, episode },
	config = {},
	options = {}
}: UseTVShowEpisodeCreditsQueryParams): UseTVShowEpisodeCreditsQueryResult => {
	const toast = useToast();

	const [toastID, setToastID] = useState<string>(tvShowEpisodeCreditsQueryToastID({ id, season, episode }));
	const [key, setKey] = useState<QueryKey>(tvShowEpisodeCreditsQueryKey({ id, season, episode }));

	const client = useQueryClient();
	const query = useQuery<UseTVShowEpisodeCreditsQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UseTVShowEpisodeCreditsQueryResponse>(
				`/tv/${id}/season/${season}/episode/${episode}/credits`,
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
									})} season: ${season}, episode: ${episode} credits.`,
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
		const newToastID = tvShowEpisodeCreditsQueryToastID({ id, season, episode });
		const newKey = tvShowEpisodeCreditsQueryKey({ id, season, episode });

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

export default useTVShowEpisodeCreditsQuery;
