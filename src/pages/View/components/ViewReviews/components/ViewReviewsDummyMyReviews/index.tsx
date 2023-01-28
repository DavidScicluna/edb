import { FC } from 'react';

import { useTheme, DummyButton } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import { range } from 'lodash';

import { useUserTheme } from '../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../containers/Layout/common/hooks';
import DummyReview from '../ViewReviewsDummyReview';
import DummyReviews from '../ViewReviewsDummyReviews';
import { VerticalGrid } from '../../../../../../components';

const ViewReviewsDummyMyReviews: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing } = useLayoutContext();

	return (
		<DummyReviews
			title='My Reviews'
			renderFooter={() => (
				<DummyButton
					color={color}
					colorMode={colorMode}
					isFullWidth
					hasLeft
					size={isSm ? 'xs' : 'sm'}
					variant='text'
				>
					Create a new Review
				</DummyButton>
			)}
		>
			<VerticalGrid displayMode='list'>
				{() => range(2).map((_dummy, index) => <DummyReview key={index} />)}
			</VerticalGrid>
		</DummyReviews>
	);
};

export default ViewReviewsDummyMyReviews;
