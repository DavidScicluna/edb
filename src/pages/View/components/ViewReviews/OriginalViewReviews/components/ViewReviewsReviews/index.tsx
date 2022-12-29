import { FC } from 'react';

import { Card, CardHeader, CardBody, CardFooter } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';
import { useUserTheme } from '../../../../../../../common/hooks';
import { TotalBadge } from '../../../../../../../components';

import { ViewReviewsReviewsProps } from './types';

const ViewReviewsReviews: FC<ViewReviewsReviewsProps> = (props) => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const { children, renderFooter, title, subtitle, total = 0, hasHeader = true } = props;

	return (
		<Card colorMode={colorMode} isFullWidth spacing={spacing} p={spacing} variant='transparent'>
			{hasHeader && (
				<CardHeader
					renderTitle={(props) => (
						<Text {...props} fontSize='2xl'>
							{title}
						</Text>
					)}
					renderSubtitle={subtitle ? (props) => <Text {...props}>{title}</Text> : undefined}
					actions={<TotalBadge color={color} colorMode={colorMode} total={total} />}
				/>
			)}
			<CardBody>{children}</CardBody>
			{renderFooter && <CardFooter>{renderFooter()}</CardFooter>}
		</Card>
	);
};

export default ViewReviewsReviews;
