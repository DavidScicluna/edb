import { FC } from 'react';

import { Divider } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import DummyMyReviews from '../components/ViewReviewsDummyMyReviews';
import DummyOtherReviews from '../components/ViewReviewsDummyOtherReviews';
import { useUserTheme } from '../../../../../common/hooks';
import { useLayoutContext } from '../../../../../containers/Layout/common/hooks';

const DummyViewReviews: FC = () => {
	const { colorMode } = useUserTheme();

	const { isGuest, spacing } = useLayoutContext();

	return (
		<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={spacing}>
			{!isGuest && <DummyMyReviews />}

			<DummyOtherReviews />
		</VStack>
	);
};

export default DummyViewReviews;
