import { FC, useCallback } from 'react';

import { useTheme, DummyCard, CardBody, Skeleton, Badge, BadgeLabel, utils } from '@davidscicluna/component-library';

import { useMediaQuery, useBreakpointValue, HStack, VStack, Center } from '@chakra-ui/react';

import { useUserTheme } from '../../../../common/hooks';

import { ViewDummyEpisodeProps } from './types';
import ViewDummyEpisodeOverview from './components/ViewDummyEpisodeOverview';
import ViewDummyEpisodeRating from './components/ViewDummyEpisodeRating';
import ViewDummyEpisodeDate from './components/ViewDummyEpisodeDate';
import ViewDummyEpisodeName from './components/ViewDummyEpisodeName';
import ViewDummyEpisodeImage, { width as ViewDummyEpisodeImageWidth } from './components/ViewDummyEpisodeImage';

const { convertREMToPixels, convertStringToNumber } = utils;

const spacing = 2;

const ViewDummyEpisode: FC<ViewDummyEpisodeProps> = (props) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const breakpointIndex = useBreakpointValue<number>({ 'base': 0, 'sm': 1, 'md': 2, 'lg': 3, 'xl': 4, '2xl': 5 });

	const { hasDate = false, hasOverview = false, isFullWidth = true, isLight = true, ...rest } = props;

	const handleContentWidth = useCallback(() => {
		const imageWidth = convertStringToNumber(ViewDummyEpisodeImageWidth[breakpointIndex || 0], 'px');
		const spacingWidth = convertREMToPixels(convertStringToNumber(theme.space[spacing], 'rem'));

		return `calc(100% - ${imageWidth + spacingWidth}px)`;
	}, [ViewDummyEpisodeImageWidth, spacing]);

	return (
		<DummyCard {...rest} colorMode={colorMode} isFullWidth={isFullWidth} isLight={isLight}>
			<CardBody>
				<HStack width='100%' position='relative' overflow='hidden' spacing={spacing} p={spacing}>
					<ViewDummyEpisodeImage />

					<VStack width={handleContentWidth()} alignItems='flex-start' spacing={spacing}>
						<ViewDummyEpisodeRating />

						<VStack width='100%' alignItems='flex-start' spacing={0.5}>
							<ViewDummyEpisodeName />

							{hasDate && <ViewDummyEpisodeDate />}
						</VStack>

						{hasOverview && <ViewDummyEpisodeOverview />}
					</VStack>

					<Center position='absolute' top={spacing} right={spacing}>
						<Skeleton color={color} colorMode={colorMode} isLoaded={false} variant='rectangle'>
							<Badge colorMode={colorMode} size={isSm ? 'xs' : 'sm'} variant='contained'>
								<BadgeLabel>## • ##</BadgeLabel>
							</Badge>
						</Skeleton>
					</Center>
				</HStack>
			</CardBody>
		</DummyCard>
	);
};

export default ViewDummyEpisode;
