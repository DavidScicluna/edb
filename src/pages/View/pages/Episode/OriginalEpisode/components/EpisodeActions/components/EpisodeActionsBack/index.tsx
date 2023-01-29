import { FC } from 'react';

import { Location, useParams } from 'react-router';

import { useTheme, InternalLink, Button } from '@davidscicluna/component-library';

import { useMediaQuery, useConst } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../../common/hooks';
import { formatMediaType, formatMediaTypeLabel } from '../../../../../../../../../common/utils';
import { EpisodeParams } from '../../../../types';

import { EpisodeActionsBackProps } from './types';

const EpisodeActionsBack: FC<EpisodeActionsBackProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { id } = useParams<EpisodeParams>();

	const { name } = props;

	const to = useConst<Partial<Location>>({
		pathname: `/${formatMediaType({ mediaType: 'tv' })}/${id}`,
		hash: 'seasons'
	});

	return (
		// TODO: Go over all InternalLink and pass colorMode={colorMode}
		// TODO: Go over all InternalLink and if child button is isFullWidth if so pass isFullWidth
		<InternalLink colorMode={colorMode} isFullWidth to={{ ...to }}>
			<Button colorMode={colorMode} isFullWidth size={isSm ? 'md' : 'lg'} variant='outlined'>
				{`Go back to ${name || formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })} seasons`}
			</Button>
		</InternalLink>
	);
};

export default EpisodeActionsBack;
