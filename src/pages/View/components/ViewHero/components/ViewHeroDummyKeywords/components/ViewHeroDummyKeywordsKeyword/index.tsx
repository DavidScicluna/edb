import { FC } from 'react';

import { Skeleton, Badge, BadgeLabel } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../../../../../common/hooks';

const ViewHeroDummyKeywordsKeyword: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<Skeleton colorMode={colorMode} isLoaded={false} variant='rectangle'>
			<Badge colorMode={colorMode} size='xs'>
				<BadgeLabel textTransform='capitalize'>Keyword</BadgeLabel>
			</Badge>
		</Skeleton>
	);
};

export default ViewHeroDummyKeywordsKeyword;
