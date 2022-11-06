import { FC } from 'react';

import { useTheme, Skeleton, DummyButton, Badge, BadgeLabel, utils } from '@davidscicluna/component-library';

import { useMediaQuery, Stack, Center, Text } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { Headline } from '../../../../../../../../../../components';
import { useUserTheme } from '../../../../../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../../../../../containers/Layout/common/hooks';

const { convertREMToPixels, convertStringToNumber } = utils;

const DummyMyListsTabHeadline: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing } = useLayoutContext();

	const [actionsRef, { width: actionsWidth }] = useElementSize();

	const handleHeadlineWidth = (): string => {
		const spacingWidth = convertREMToPixels(convertStringToNumber(theme.space[spacing], 'rem'));

		return isSm ? '100%' : `calc(100% - ${actionsWidth + spacingWidth}px)`;
	};

	return (
		<Stack
			width='100%'
			direction={isSm ? 'column' : 'row'}
			alignItems='center'
			justifyContent='space-between'
			spacing={spacing * 2}
			p={0}
		>
			<Headline
				width={handleHeadlineWidth()}
				renderCaption={() => (
					// TODO: Replace with DummyBadge
					<Skeleton color={color} colorMode={colorMode} isLoaded={false} variant='text'>
						<Badge color={color} colorMode={colorMode} size='xs'>
							<BadgeLabel>Total of # lists</BadgeLabel>
						</Badge>
					</Skeleton>
				)}
				renderTitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>My Lists</Text>
					</Skeleton>
				)}
				renderSubtitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>
							This Tab contains all the lists that have been created and all the bookmarks in each list.
						</Text>
					</Skeleton>
				)}
			/>

			<Center ref={actionsRef} width={isSm ? '100%' : 'auto'} height='100%'>
				<DummyButton colorMode={colorMode} hasLeft isFullWidth variant='outlined'>
					Create New List
				</DummyButton>
			</Center>
		</Stack>
	);
};

export default DummyMyListsTabHeadline;
