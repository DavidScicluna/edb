import { FC } from 'react';

import { Tooltip, Icon } from '@davidscicluna/component-library';

import { useBoolean, Text } from '@chakra-ui/react';

import ViewReviewsReviewSubtitle from '../ViewReviewsReviewSubtitle';
import { useUserTheme } from '../../../../../../../../../common/hooks';
import { formatDate } from '../../../../../../../../../common/utils';

import { ViewReviewsReviewCreatedAtProps } from './types';

const ViewReviewsReviewCreatedAt: FC<ViewReviewsReviewCreatedAtProps> = ({ createdAt }) => {
	const { colorMode } = useUserTheme();

	const [isHovering, setIsHovering] = useBoolean();

	return (
		<Tooltip
			aria-label='Show full created at date (tooltip)'
			colorMode={colorMode}
			isOpen={isHovering}
			placement='bottom-start'
			label={`Posted on: ${formatDate({ date: createdAt })}`}
			shouldWrapChildren
		>
			<ViewReviewsReviewSubtitle
				renderIcon={(props) => <Icon {...props} icon='schedule' category='outlined' />}
				renderLabel={(props) => <Text {...props}>{formatDate({ date: createdAt, section: 'year' })}</Text>}
				onMouseEnter={() => setIsHovering.on()}
				onMouseLeave={() => setIsHovering.off()}
			/>
		</Tooltip>
	);
};

export default ViewReviewsReviewCreatedAt;
