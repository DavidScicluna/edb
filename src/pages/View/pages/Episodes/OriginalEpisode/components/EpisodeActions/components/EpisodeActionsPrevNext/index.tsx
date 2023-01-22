import { FC } from 'react';

import { useParams } from 'react-router';

import { useTheme, InternalLink, Button, Icon } from '@davidscicluna/component-library';

import { useMediaQuery, useConst } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../../common/hooks';
import { formatMediaType } from '../../../../../../../../../common/utils';
import { EpisodeParams } from '../../../../types';

import { EpisodeActionsPrevNextProps } from './types';

const EpisodeActionsPrevNext: FC<EpisodeActionsPrevNextProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
	const [isMd] = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

	const { id } = useParams<EpisodeParams>();

	const { type, season_number: season, episode_number: episode } = props;

	const pathname = useConst<string>(
		`/${formatMediaType({ mediaType: 'tv' })}/${id}/seasons/${season}/episodes/${episode}`
	);

	return (
		<InternalLink colorMode={colorMode} to={{ pathname }} isFullWidth={isMd}>
			<Button
				colorMode={colorMode}
				renderLeft={type === 'prev' ? () => <Icon icon='arrow_back' category='outlined' /> : undefined}
				renderRight={type === 'next' ? () => <Icon icon='arrow_forward' category='outlined' /> : undefined}
				isFullWidth={isMd}
				size={isSm ? 'md' : 'lg'}
				variant='outlined'
			>
				{[`S${season}`, `E${episode}`].join(' • ')}
			</Button>
		</InternalLink>
	);
};

export default EpisodeActionsPrevNext;
