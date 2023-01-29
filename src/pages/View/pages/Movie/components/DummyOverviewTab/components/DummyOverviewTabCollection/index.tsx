import { FC } from 'react';

import {
	DummyCard,
	DummyCardHeader,
	CardBody,
	Skeleton,
	Badge,
	BadgeIcon,
	BadgeLabel
} from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../../../../../common/hooks';
import { DummyHorizontalPoster } from '../../../../../../../../components';

const DummyOverviewTabCollection: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<DummyCard colorMode={colorMode} isFullWidth p={2}>
			<DummyCardHeader
				hasTitle
				hasSubtitle
				actions={
					<Skeleton colorMode={colorMode} isLoaded={false} variant='rectangle'>
						<Badge colorMode={colorMode} size='xs' variant='outlined'>
							<BadgeIcon icon='tag' category='outlined' />
							<BadgeLabel>## Movie in the Collection</BadgeLabel>
						</Badge>
					</Skeleton>
				}
			/>
			<CardBody>
				<DummyHorizontalPoster mediaType='collection' hasSubtitle hasDescription />
			</CardBody>
		</DummyCard>
	);
};

export default DummyOverviewTabCollection;
