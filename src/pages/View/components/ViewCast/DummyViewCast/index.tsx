import { ReactElement } from 'react';

import { useTheme } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Center } from '@chakra-ui/react';

import { range } from 'lodash';

import { VerticalGrid, LoadMore, DummyHorizontalPoster, DummyVerticalPoster } from '../../../../../components';
import { formatMediaTypeLabel } from '../../../../../common/utils';
import { useLayoutContext } from '../../../../../containers/Layout/common/hooks';
import { ViewCastMediaType } from '../common/types';

import { DummyViewCastProps } from './types';

const DummyViewCast = <MT extends ViewCastMediaType>({ mediaType }: DummyViewCastProps<MT>): ReactElement => {
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
				<LoadMore
					amount={0}
					total={0}
					label={`${formatMediaTypeLabel({ type: 'single', mediaType })} Cast`}
					isDisabled
					isLoading
					isButtonVisible
				/>
			</Center>
		</VStack>
	);
};

export default DummyViewCast;
