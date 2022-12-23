import { ReactElement } from 'react';

import { useTheme, InternalLink, utils } from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';

import { ViewHeroCrewMediaType } from '../../types';
import { useUserTheme } from '../../../../../../../../common/hooks';
import { formatMediaType } from '../../../../../../../../common/utils';
import ViewHeroText from '../../../ViewHeroText';

import { ViewHeroCrewPersonProps } from './types';

const { getColor } = utils;

const ViewHeroCrewPerson = <MT extends ViewHeroCrewMediaType>(props: ViewHeroCrewPersonProps<MT>): ReactElement => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { id, name } = props;

	const [isHovering, setIsHovering] = useBoolean();

	return (
		<InternalLink
			colorMode={colorMode}
			to={{ pathname: `/${formatMediaType({ mediaType: 'person' })}/${id}` }}
			onMouseEnter={() => setIsHovering.on()}
			onMouseLeave={() => setIsHovering.off()}
		>
			<ViewHeroText
				color={getColor({
					theme,
					colorMode,
					color: isHovering ? color : 'gray',
					type: isHovering ? 'color' : 'text.primary'
				})}
				textTransform='capitalize'
			>
				{name}
			</ViewHeroText>
		</InternalLink>
	);
};

export default ViewHeroCrewPerson;
