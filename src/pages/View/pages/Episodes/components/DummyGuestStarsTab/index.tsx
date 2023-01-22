import { FC } from 'react';

import { useTheme, Headline, Divider, Skeleton, Badge, BadgeLabel } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Center, Text } from '@chakra-ui/react';

import { range } from 'lodash';

import { useUserTheme } from '../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../containers/Layout/common/hooks';
import { DummyHorizontalPoster, DummyVerticalPoster, LoadMore, VerticalGrid } from '../../../../../../components';

const DummyGuestStarsTab: FC = () => {
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
							<BadgeLabel>TV Show Episode has a total of # Guest Stars</BadgeLabel>
						</Badge>
					</Skeleton>
				)}
				renderTitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>Guest Stars</Text>
					</Skeleton>
				)}
				renderSubtitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>
							This Tab contains all the People that made a guest appearance in the TV Show Episode
						</Text>
					</Skeleton>
				)}
				py={spacing * 2}
			/>

			<VStack width='100%' spacing={spacing}>
				<VerticalGrid spacing={spacing}>
					{({ displayMode }) =>
						range(20).map((_dummy, index) =>
							displayMode === 'list' ? (
								<DummyHorizontalPoster key={index} mediaType='person' hasSubtitle />
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
						label='TV Show Episode Guest Stars'
						isDisabled
						isLoading
						isButtonVisible
					/>
				</Center>
			</VStack>
		</VStack>
	);
};

export default DummyGuestStarsTab;
