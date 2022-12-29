import { FC } from 'react';

import { Card, CardHeader, CardBody, CardFooter, Skeleton } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../containers/Layout/common/hooks';

import { ViewReviewsDummyReviewsProps } from './types';

const ViewReviewsDummyReviews: FC<ViewReviewsDummyReviewsProps> = (props) => {
	const { colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const { children, renderFooter, title, subtitle, hasHeader = true } = props;

	return (
		<Card colorMode={colorMode} isFullWidth spacing={spacing} p={spacing} variant='transparent'>
			{hasHeader && (
				<CardHeader
					renderTitle={(props) => (
						<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
							<Text {...props} fontSize='2xl'>
								{title}
							</Text>
						</Skeleton>
					)}
					renderSubtitle={
						subtitle
							? (props) => (
									<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
										<Text {...props}>{title}</Text>
									</Skeleton>
							  )
							: undefined
					}
				/>
			)}
			<CardBody>{children}</CardBody>
			{renderFooter && <CardFooter>{renderFooter()}</CardFooter>}
		</Card>
	);
};

export default ViewReviewsDummyReviews;
