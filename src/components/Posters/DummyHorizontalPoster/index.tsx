import { ReactElement, useCallback, memo } from 'react';

import { useTheme, DummyCard, CardBody, utils } from '@davidscicluna/component-library';

import { useMediaQuery, useBreakpointValue, HStack, VStack } from '@chakra-ui/react';

import { useUserTheme } from '../../../common/hooks';
import { MediaType } from '../../../common/types';
import DummyPosterBookmark from '../components/DummyPosterBookmark';
import DummyPosterLike from '../components/DummyPosterLike';
import DummyPosterQuickview from '../components/DummyPosterQuickview';

import { DummyHorizontalPosterProps } from './types';
import DummyHorizontalPosterDescription from './components/DummyHorizontalPosterDescription';
import DummyHorizontalPosterRating from './components/DummyHorizontalPosterRating';
import DummyHorizontalPosterSubtitle from './components/DummyHorizontalPosterSubtitle';
import DummyHorizontalPosterTitle from './components/DummyHorizontalPosterTitle';
import DummyHorizontalPosterImage, {
	width as DummyHorizontalPosterImageWidth
} from './components/DummyHorizontalPosterImage';

const { convertREMToPixels, convertStringToNumber } = utils;

const spacing = 2;

const DummyHorizontalPoster = <MT extends MediaType>(props: DummyHorizontalPosterProps<MT>): ReactElement => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const breakpointIndex = useBreakpointValue<number>({ 'base': 0, 'sm': 1, 'md': 2, 'lg': 3, 'xl': 4, '2xl': 5 });

	const {
		mediaType,
		hasSubtitle = false,
		hasDescription = false,
		isFullWidth = true,
		isLight = true,
		...rest
	} = props;

	const handleContentWidth = useCallback(() => {
		const imageWidth = convertStringToNumber(DummyHorizontalPosterImageWidth[breakpointIndex || 0], 'px');
		const spacingWidth = convertREMToPixels(convertStringToNumber(theme.space[spacing], 'rem'));

		return `calc(100% - ${imageWidth + spacingWidth}px)`;
	}, [DummyHorizontalPosterImageWidth, spacing]);

	return (
		<DummyCard {...rest} colorMode={colorMode} isFullWidth={isFullWidth} isLight={isLight}>
			<CardBody>
				<HStack width='100%' position='relative' overflow='hidden' spacing={spacing} p={spacing}>
					<DummyHorizontalPosterImage />

					<VStack width={handleContentWidth()} alignItems='flex-start' spacing={spacing}>
						{(mediaType === 'movie' || mediaType === 'tv') && <DummyHorizontalPosterRating />}

						<VStack width='100%' alignItems='flex-start' spacing={0.5}>
							<DummyHorizontalPosterTitle />

							{hasSubtitle && <DummyHorizontalPosterSubtitle />}
						</VStack>

						{hasDescription && <DummyHorizontalPosterDescription />}
					</VStack>

					<HStack position='absolute' top={spacing} right={spacing} spacing={0.5}>
						{mediaType !== 'company' && <DummyPosterQuickview size={isSm ? 'md' : 'lg'} />}

						<DummyPosterLike size={isSm ? 'md' : 'lg'} />

						{(mediaType === 'movie' || mediaType === 'tv') && (
							<DummyPosterBookmark size={isSm ? 'md' : 'lg'} />
						)}
					</HStack>
				</HStack>
			</CardBody>
		</DummyCard>
	);
};

export default memo(DummyHorizontalPoster);
