import { ReactElement, useCallback } from 'react';

import { useTheme, InternalLink, Card, CardBody, utils } from '@davidscicluna/component-library';

import { useMediaQuery, useBreakpointValue, useBoolean, HStack, VStack } from '@chakra-ui/react';

import { useInView } from 'react-cool-inview';

import { useUserTheme } from '../../../common/hooks';
import { MediaType } from '../../../common/types';
import { formatMediaType } from '../../../common/utils';
import { isFixed as defaultIsFixed } from '../common/data/defaultPropValues';
import PosterLike from '../components/PosterLike';
import PosterBookmark from '../components/PosterBookmark';
import PosterQuickview from '../components/PosterQuickview';
import { QuickViewModalMediaType } from '../../../store/slices/Modals/types';

import { HorizontalPosterProps } from './types';
import HorizontalPosterDescription from './components/HorizontalPosterDescription';
import HorizontalPosterRating from './components/HorizontalPosterRating';
import HorizontalPosterSubtitle from './components/HorizontalPosterSubtitle';
import HorizontalPosterTitle from './components/HorizontalPosterTitle';
import HorizontalPosterImage, { width as horizontalPosterImageWidth } from './components/HorizontalPosterImage';

const { convertREMToPixels, convertStringToNumber } = utils;

const spacing = 2;

const HorizontalPoster = <MT extends MediaType>(props: HorizontalPosterProps<MT>): ReactElement => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { observe: posterRef, inView } = useInView<HTMLDivElement>({
		unobserveOnEnter: true,
		rootMargin: `-${convertREMToPixels(convertStringToNumber(theme.space[4], 'rem'))}px 0px`
	});

	const breakpointIndex = useBreakpointValue<number>({ 'base': 0, 'sm': 1, 'md': 2, 'lg': 3, 'xl': 4, '2xl': 5 });

	const {
		mediaItem,
		mediaType,
		image,
		rating,
		title,
		subtitle,
		description,
		isDisabled = false,
		isFullWidth = true,
		isLight = true,
		...rest
	} = props;

	const [isFixed, setIsFixed] = useBoolean(defaultIsFixed);

	const handleContentWidth = useCallback(() => {
		const imageWidth = convertStringToNumber(horizontalPosterImageWidth[breakpointIndex || 0], 'px');
		const spacingWidth = convertREMToPixels(convertStringToNumber(theme.space[spacing], 'rem'));

		return `calc(100% - ${imageWidth + spacingWidth}px)`;
	}, [horizontalPosterImageWidth, spacing]);

	return (
		<InternalLink
			to={{ pathname: `/${formatMediaType({ mediaType })}/${mediaItem.id || ''}` }}
			isDisabled={isDisabled || isFixed || mediaType === 'company'}
			isFullWidth={isFullWidth}
		>
			<Card
				{...rest}
				ref={posterRef}
				colorMode={colorMode}
				isClickable={mediaType !== 'company'}
				isDisabled={isDisabled}
				isFullWidth={isFullWidth}
				isFixed={isFixed}
				isLight={isLight}
			>
				<CardBody>
					<HStack width='100%' position='relative' overflow='hidden' spacing={spacing} p={spacing}>
						<HorizontalPosterImage<MT>
							mediaItem={mediaItem}
							mediaType={mediaType}
							image={image}
							inView={inView}
						/>

						<VStack width={handleContentWidth()} alignItems='flex-start' spacing={spacing}>
							{(mediaType === 'movie' || mediaType === 'tv') && rating && rating.rating && (
								<HorizontalPosterRating {...rating} />
							)}

							<VStack width='100%' alignItems='flex-start' spacing={0.5}>
								<HorizontalPosterTitle<MT> title={title} inView={inView} />

								{!!subtitle && <HorizontalPosterSubtitle<MT> subtitle={subtitle} inView={inView} />}
							</VStack>

							{!!description && (
								<HorizontalPosterDescription<MT> description={description} inView={inView} />
							)}
						</VStack>

						<HStack
							position='absolute'
							top={spacing}
							right={spacing}
							onMouseEnter={() => setIsFixed.on()}
							onMouseLeave={() => setIsFixed.off()}
							spacing={0.5}
						>
							{mediaType !== 'company' && (
								<PosterQuickview<QuickViewModalMediaType>
									title={title}
									mediaType={mediaType}
									mediaItem={mediaItem}
									size={isSm ? 'md' : 'lg'}
								/>
							)}

							<PosterLike<MT>
								title={title}
								mediaType={mediaType}
								mediaItem={mediaItem}
								size={isSm ? 'md' : 'lg'}
							/>

							{(mediaType === 'movie' || mediaType === 'tv') && (
								<PosterBookmark<MT>
									title={title}
									mediaType={mediaType}
									mediaItem={mediaItem}
									size={isSm ? 'md' : 'lg'}
								/>
							)}
						</HStack>
					</HStack>
				</CardBody>
			</Card>
		</InternalLink>
	);
};

export default HorizontalPoster;
