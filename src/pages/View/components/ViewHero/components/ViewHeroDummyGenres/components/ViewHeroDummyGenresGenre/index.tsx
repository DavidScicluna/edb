import { FC } from 'react';

import { Skeleton, Badge, BadgeLabel } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../../../../../common/hooks';

const ViewHeroDummyGenresGenre: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
			<Badge colorMode={colorMode} size='xs'>
				<BadgeLabel textTransform='capitalize'>Genre</BadgeLabel>
			</Badge>
		</Skeleton>
	);
};

export default ViewHeroDummyGenresGenre;
