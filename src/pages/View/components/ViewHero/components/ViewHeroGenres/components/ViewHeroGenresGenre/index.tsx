import { FC } from 'react';

import { InternalLink, Badge, BadgeLabel } from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';

import qs from 'query-string';

import { useUserTheme } from '../../../../../../../../common/hooks';
import { formatMediaType } from '../../../../../../../../common/utils';

import { ViewHeroGenresGenreProps } from './types';

const ViewHeroGenresGenre: FC<ViewHeroGenresGenreProps> = ({ mediaType, id, name }) => {
	const { color, colorMode } = useUserTheme();

	const [isHovering, setIsHovering] = useBoolean();

	return (
		<InternalLink
			colorMode={colorMode}
			to={{ pathname: `/${formatMediaType({ mediaType })}`, search: qs.stringify({ with_genres: id }) }}
			onMouseEnter={() => setIsHovering.on()}
			onMouseLeave={() => setIsHovering.off()}
		>
			<Badge color={isHovering ? color : 'gray'} colorMode={colorMode} size='xs'>
				<BadgeLabel textTransform='capitalize'>{name}</BadgeLabel>
			</Badge>
		</InternalLink>
	);
};

export default ViewHeroGenresGenre;
