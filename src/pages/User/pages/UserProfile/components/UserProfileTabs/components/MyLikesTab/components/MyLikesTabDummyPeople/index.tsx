import { FC } from 'react';

import { useTheme } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Center } from '@chakra-ui/react';

import { range } from 'lodash';

import { useLayoutContext } from '../../../../../../../../../../containers/Layout/common/hooks';
import {
	DummyHorizontalPoster,
	DummyVerticalPoster,
	VerticalGrid,
	DummyLoadMore
} from '../../../../../../../../../../components';

const MyLikesTabDummyPeople: FC = () => {
	const theme = useTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing } = useLayoutContext();

	return (
		<VStack width='100%' spacing={spacing}>
			<VerticalGrid spacing={spacing}>
				{({ displayMode }) =>
					range(20).map((_dummy, index) =>
						displayMode === 'list' ? (
							<DummyHorizontalPoster key={index} mediaType='person' hasSubtitle hasDescription />
						) : (
							<DummyVerticalPoster key={index} mediaType='person' hasSubtitle />
						)
					)
				}
			</VerticalGrid>

			<Center width={isSm ? '100%' : 'auto'}>
				<DummyLoadMore isButtonVisible />
			</Center>
		</VStack>
	);
};

export default MyLikesTabDummyPeople;
