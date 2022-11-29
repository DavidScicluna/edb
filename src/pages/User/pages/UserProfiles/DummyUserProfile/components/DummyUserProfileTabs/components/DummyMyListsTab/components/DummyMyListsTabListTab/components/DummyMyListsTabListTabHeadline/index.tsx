import { FC } from 'react';

import { useTheme, Headline, Skeleton, DummyButton, Badge, BadgeLabel, utils } from '@davidscicluna/component-library';

import { useMediaQuery, Stack, HStack, Text } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { useUserTheme } from '../../../../../../../../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../../../../../../../../containers/Layout/common/hooks';

const { convertREMToPixels, convertStringToNumber } = utils;

const DummyMyListsTabListTabHeadline: FC = () => {
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
							<BadgeLabel>Total of # bookmarks in list</BadgeLabel>
						</Badge>
					</Skeleton>
				)}
				renderTitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>List Label</Text>
					</Skeleton>
				)}
				renderSubtitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>This is a description explaining what the list contains of</Text>
					</Skeleton>
				)}
			/>

			<HStack ref={actionsRef} width={isSm ? '100%' : 'auto'} height='100%' spacing={spacing / 2}>
				<DummyButton color={color} colorMode={colorMode} hasLeft variant='outlined'>
					Edit
				</DummyButton>

				<DummyButton color='red' colorMode={colorMode} hasLeft variant='outlined'>
					Delete
				</DummyButton>
			</HStack>
		</Stack>
	);
};

export default DummyMyListsTabListTabHeadline;
