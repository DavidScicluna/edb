import { FC } from 'react';

import { useParams } from 'react-router';

import { useDebounce, InternalLink, Button, Icon } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../../../../common/hooks';
import { formatMediaType, formatMediaTypeLabel } from '../../../../../../../common/utils';
import ViewActions from '../../../../../components/ViewActions';
import { EpisodeParams } from '../../types';
import { useEpisodeContext } from '../../common/hooks';

import { EpisodeActionsProps } from './types';
import { getAdjacentEpisode } from './utils';

const EpisodeActions: FC<EpisodeActionsProps> = (props) => {
	const { colorMode } = useUserTheme();

	const { id } = useParams<EpisodeParams>();

	const { showQuery, episodeQuery } = useEpisodeContext();

	const { data: show } = showQuery || {};
	const { name, seasons = [] } = show || {};

	const { data: episode } = episodeQuery || {};

	const prev = getAdjacentEpisode({ direction: 'prev', seasons, episode });
	const prevDebounced = useDebounce(prev);
	const next = getAdjacentEpisode({ direction: 'next', seasons, episode });
	const nextDebounced = useDebounce(next);

	return (
		<ViewActions {...props}>
			{prevDebounced && prevDebounced.season && prevDebounced.episode && (
				<InternalLink
					colorMode={colorMode}
					to={{
						pathname: `/${formatMediaType({ mediaType: 'tv' })}/${id}/seasons/${
							prevDebounced.season
						}/episodes/${prevDebounced.episode}`
					}}
				>
					<Button
						colorMode={colorMode}
						renderLeft={() => <Icon icon='arrow_back' category='outlined' />}
						size='lg'
						variant='outlined'
					>
						{[`S${prevDebounced.season}`, `E${prevDebounced.episode}`].join(' • ')}
					</Button>
				</InternalLink>
			)}
			{/* // TODO: Go over all InternalLink and pass colorMode={colorMode} */}
			{/* // TODO: Go over all InternalLink and if child button is isFullWidth if so pass isFullWidth */}
			<InternalLink
				colorMode={colorMode}
				isFullWidth
				to={{ pathname: `/${formatMediaType({ mediaType: 'tv' })}/${id}`, hash: 'seasons' }}
			>
				<Button colorMode={colorMode} isFullWidth size='lg' variant='outlined'>
					{`Go back to ${name || formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })} seasons`}
				</Button>
			</InternalLink>
			{nextDebounced && nextDebounced.season && nextDebounced.episode && (
				<InternalLink
					colorMode={colorMode}
					to={{
						pathname: `/${formatMediaType({ mediaType: 'tv' })}/${id}/seasons/${
							nextDebounced.season
						}/episodes/${nextDebounced.episode}`
					}}
				>
					<Button
						colorMode={colorMode}
						renderRight={() => <Icon icon='arrow_forward' category='outlined' />}
						size='lg'
						variant='outlined'
					>
						{[`S${nextDebounced.season}`, `E${nextDebounced.episode}`].join(' • ')}
					</Button>
				</InternalLink>
			)}
		</ViewActions>
	);
};

export default EpisodeActions;
