import { FC } from 'react';

import { Skeleton, Badge, BadgeLabel } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../../../../../common/hooks';

const ViewHeroDummyGenresGenre: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<Badge colorMode={colorMode} size='xs'>
			<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
				<BadgeLabel textTransform='capitalize'>Genre</BadgeLabel>
			</Skeleton>
		</Badge>
	);
};

export default ViewHeroDummyGenresGenre;
