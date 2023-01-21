import { FC } from 'react';

import { useParams } from 'react-router';

import { InternalLink, Button, Icon } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../../../../common/hooks';
import { formatMediaType, formatMediaTypeLabel } from '../../../../../../../common/utils';
import ViewActions from '../../../../../components/ViewActions';
import { EpisodeParams } from '../../types';

import { EpisodeActionsProps } from './types';

const EpisodeActions: FC<EpisodeActionsProps> = (props) => {
	const { colorMode } = useUserTheme();

	const { id } = useParams<EpisodeParams>();

	return (
		<ViewActions {...props}>
			{/* // TODO: Go over all InternalLink and pass colorMode={colorMode} */}
			{/* // TODO: Go over all InternalLink and if child button is isFullWidth if so pass isFullWidth */}
			<InternalLink
				colorMode={colorMode}
				isFullWidth
				to={{ pathname: `/${formatMediaType({ mediaType: 'tv' })}/${id}`, hash: 'seasons' }}
			>
				<Button
					colorMode={colorMode}
					renderLeft={() => <Icon icon='arrow_back' category='outlined' />}
					isFullWidth
					size='lg'
					variant='outlined'
				>
					{`Go back to ${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })} seasons`}
				</Button>
			</InternalLink>
		</ViewActions>
	);
};

export default EpisodeActions;
