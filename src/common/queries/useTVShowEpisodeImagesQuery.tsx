import { useState } from 'react';

import { Alert, utils } from '@davidscicluna/component-library';

import { useToast } from '@chakra-ui/react';

import { UseQueryResult, UseQueryOptions, QueryKey, useQueryClient, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { useWillUnmount } from 'rooks';
import { compact, memoize } from 'lodash';
import { useUpdateEffect } from 'usehooks-ts';

import { axios } from '../scripts';
import { AxiosConfig, Images, QueryError } from '../types';
import { formatMediaTypeLabel } from '../utils';
import { TVShowEpisode, TVShowFullSeason, FullTVShow } from '../types/tv';

const { convertDurationToMS } = utils;

export type UseTVShowEpisodeImagesQueryProps = Pick<FullTVShow, 'id'> & {
	season: TVShowFullSeason['id'];
	episode: TVShowEpisode['id'];
};

export type UseTVShowEpisodeImagesQueryResponse = Images;

export type UseTVShowEpisodeImagesQueryOptions = UseQueryOptions<
	UseTVShowEpisodeImagesQueryResponse,
	AxiosError<QueryError>
>;

export type UseTVShowEpisodeImagesQueryResult = UseQueryResult<
	UseTVShowEpisodeImagesQueryResponse,
	AxiosError<QueryError>
>;

type UseTVShowEpisodeImagesQueryParams = {
	props: UseTVShowEpisodeImagesQueryProps;
	config?: AxiosConfig;
	options?: UseTVShowEpisodeImagesQueryOptions;
};

export const tvShowEpisodeImagesQueryToastID = memoize(
	({ id, season, episode }: UseTVShowEpisodeImagesQueryProps): string =>
		`ds-edb-tv-show-${id}-season-${season}-episode-${episode}-images-query-toast`
);
export const tvShowEpisodeImagesQueryKey = memoize(
	({ id, season, episode }: UseTVShowEpisodeImagesQueryProps): QueryKey => [
		`ds-edb-tv-show-${id}-season-${season}-episode-${episode}-images-query`
	]
);

const useTVShowEpisodeImagesQuery = ({
	props: { id, season, episode },
	config = {},
	options = {}
}: UseTVShowEpisodeImagesQueryParams): UseTVShowEpisodeImagesQueryResult => {
	const toast = useToast();

	const [toastID, setToastID] = useState<string>(tvShowEpisodeImagesQueryToastID({ id, season, episode }));
	const [key, setKey] = useState<QueryKey>(tvShowEpisodeImagesQueryKey({ id, season, episode }));

	const client = useQueryClient();
	const query = useQuery<UseTVShowEpisodeImagesQueryResponse, AxiosError<QueryError>>(
		key,
		async ({ signal }) => {
			const { data } = await axios.get<UseTVShowEpisodeImagesQueryResponse>(
				`/tv/${id}/season/${season}/episode/${episode}/images`,
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
									})} season: ${season}, episode: ${episode} photos.`,
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
		const newToastID = tvShowEpisodeImagesQueryToastID({ id, season, episode });
		const newKey = tvShowEpisodeImagesQueryKey({ id, season, episode });

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

export default useTVShowEpisodeImagesQuery;
