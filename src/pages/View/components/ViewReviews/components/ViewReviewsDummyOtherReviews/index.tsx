import { FC } from 'react';

import { useTheme } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Center } from '@chakra-ui/react';

import { range } from 'lodash';

import DummyReview from '../ViewReviewsDummyReview';
import DummyReviews from '../ViewReviewsDummyReviews';
import { DummyLoadMore, VerticalGrid } from '../../../../../../components';
import { useLayoutContext } from '../../../../../../containers/Layout/common/hooks';

const ViewReviewsDummyOtherReviews: FC = () => {
	const theme = useTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { isGuest, spacing } = useLayoutContext();

	return (
		<DummyReviews title='Other Reviews' hasHeader={!isGuest}>
			<VStack width='100%' spacing={spacing}>
				<VerticalGrid displayMode='list'>
					{() => range(5).map((_dummy, index) => <DummyReview key={index} />)}
				</VerticalGrid>

				<Center width={isSm ? '100%' : 'auto'}>
					<DummyLoadMore isButtonVisible />
				</Center>
			</VStack>
		</DummyReviews>
	);
};

export default ViewReviewsDummyOtherReviews;
