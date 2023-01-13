import { FC } from 'react';

import {
	useTheme,
	DummyCard,
	DummyCardHeader,
	CardBody,
	CardFooter,
	DummyButton
} from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import DummyReview from '../../../../../../components/ViewReviews/components/ViewReviewsDummyReview';
import { useUserTheme } from '../../../../../../../../common/hooks';

const DummyOverviewTabReview: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	return (
		<DummyCard colorMode={colorMode} isFullWidth p={2}>
			<DummyCardHeader hasTitle />
			<CardBody>
				<DummyReview />
			</CardBody>
			<CardFooter>
				<DummyButton color={color} colorMode={colorMode} isFullWidth size={isSm ? 'xs' : 'sm'} variant='text'>
					View all ## Reviews
				</DummyButton>
			</CardFooter>
		</DummyCard>
	);
};

export default DummyOverviewTabReview;
