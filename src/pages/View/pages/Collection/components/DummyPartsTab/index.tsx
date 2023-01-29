import { FC } from 'react';

import { useTheme, Headline, Skeleton, Badge, BadgeLabel, Divider } from '@davidscicluna/component-library';

import { useMediaQuery, Center, VStack, Text } from '@chakra-ui/react';

import { range } from 'lodash';

import { useLayoutContext } from '../../../../../../containers/Layout/common/hooks';
import {
	DummyHorizontalPoster,
	DummyVerticalPoster,
	VerticalGrid,
	LoadMore,
	DummyDisplayMode
} from '../../../../../../components';
import { useUserTheme } from '../../../../../../common/hooks';
import { formatMediaTypeLabel } from '../../../../../../common/utils';

const DummyPartsTab: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing } = useLayoutContext();

	return (
		<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={spacing}>
			<Headline
				width='100%'
				renderCaption={() => (
					// TODO: Replace with DummyBadge
					<Skeleton color={color} colorMode={colorMode} isLoaded={false} variant='rectangle'>
						<Badge color={color} colorMode={colorMode} size='xs'>
							<BadgeLabel>Collection has a total of # Movies</BadgeLabel>
						</Badge>
					</Skeleton>
				)}
				renderTitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>Movies</Text>
					</Skeleton>
				)}
				renderSubtitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>This Tab contains all the Movies that are part of the collection</Text>
					</Skeleton>
				)}
				renderRight={() => <DummyDisplayMode />}
				py={spacing * 2}
			/>

			<VStack width='100%' spacing={spacing}>
				<VerticalGrid>
					{({ displayMode }) =>
						range(20).map((_dummy, index) =>
							displayMode === 'list' ? (
								<DummyHorizontalPoster key={index} mediaType='movie' hasSubtitle hasDescription />
							) : (
								<DummyVerticalPoster key={index} mediaType='movie' hasSubtitle />
							)
						)
					}
				</VerticalGrid>

				<Center width={isSm ? '100%' : 'auto'}>
					<LoadMore
						amount={0}
						total={0}
						label={`${formatMediaTypeLabel({
							type: 'single',
							mediaType: 'collection'
						})} ${formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' })}`}
						isDisabled
						isLoading
						isButtonVisible
					/>
				</Center>
			</VStack>
		</VStack>
	);
};

export default DummyPartsTab;
