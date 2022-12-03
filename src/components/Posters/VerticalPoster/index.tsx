import { ReactElement } from 'react';

import { InternalLink, Card, CardBody } from '@davidscicluna/component-library';

import { useBoolean, VStack, HStack } from '@chakra-ui/react';

import { useInView } from 'react-cool-inview';
import { merge } from 'lodash';

import { MediaType } from '../../../common/types';
import { formatMediaType } from '../../../common/utils';
import Rating from '../../Ratings/Rating';
import {
	inView as defaultInView,
	isFocused as defaultIsFocused,
	isHovering as defaultIsHovering,
	isFixed as defaultIsFixed
} from '../common/data/defaultPropValues';
import PosterLike from '../components/PosterLike';
import PosterBookmark from '../components/PosterBookmark';
import PosterGlass from '../components/PosterGlass';
import { useUserTheme } from '../../../common/hooks';

import { VerticalPosterProps } from './types';
import VerticalPosterImage from './components/VerticalPosterImage';
import VerticalPosterTitle from './components/VerticalPosterTitle';
import VerticalPosterSubtitle from './components/VerticalPosterSubtitle';

// const { checkIsTouchDevice } = utils;

// const isTouchDevice: boolean = checkIsTouchDevice();

const VerticalPoster = <MT extends MediaType>(props: VerticalPosterProps<MT>): ReactElement => {
	const { colorMode } = useUserTheme();

	const { observe: posterRef, inView = defaultInView } = useInView<HTMLDivElement>({
		// threshold: [0.2, 0.4, 0.6, 0.8, 1],
		unobserveOnEnter: true
	});

	const {
		mediaItem,
		mediaType,
		image,
		rating,
		title,
		subtitle,
		isDisabled = false,
		isFullWidth = true,
		isLight = true,
		sx,
		...rest
	} = props;

	const [isFocused, setIsFocused] = useBoolean(defaultIsFocused);
	const [isHovering, setIsHovering] = useBoolean(defaultIsHovering);

	const [isFixed, setIsFixed] = useBoolean(defaultIsFixed);

	return (
		<InternalLink
			to={mediaType !== 'company' ? { pathname: `/${formatMediaType({ mediaType })}/${mediaItem.id || ''}` } : {}}
			isDisabled={isDisabled || isFixed || mediaType === 'company'}
			isFullWidth={isFullWidth}
			onFocus={() => setIsFocused.on()}
			onBlur={() => setIsFocused.off()}
			onMouseEnter={() => setIsHovering.on()}
			onMouseLeave={() => setIsHovering.off()}
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
				sx={merge({ alignItems: 'flex-start' }, sx)}
			>
				<CardBody width='100%'>
					<VStack width='100%' position='relative' overflow='hidden' spacing={0}>
						<VerticalPosterImage<MT>
							mediaItem={mediaItem}
							mediaType={mediaType}
							image={image}
							title={title}
							isFocused={isFocused}
							isHovering={isHovering}
							inView={inView}
							onSetIsFixed={setIsFixed}
						/>

						<VStack width='100%' spacing={0.5} p={1}>
							{(mediaType === 'movie' || mediaType === 'tv') && (
								<HStack width='100%' justify='space-between' spacing={0}>
									{rating && <Rating rating={rating.rating} count={rating.count} size='sm' />}

									<HStack
										onMouseEnter={() => setIsFixed.on()}
										onMouseLeave={() => setIsFixed.off()}
										spacing={0.5}
									>
										{/* {isTouchDevice && (
											<Quickview<MT>
												title={title}
												mediaType={mediaType}
												mediaItem={mediaItem}
					size='xs'
											/>
										)} */}

										<PosterLike<MT>
											title={title}
											mediaType={mediaType}
											mediaItem={mediaItem}
											size='xs'
										/>

										<PosterBookmark<MT>
											title={title}
											mediaType={mediaType}
											mediaItem={mediaItem}
											size='xs'
										/>
									</HStack>
								</HStack>
							)}

							<VStack width='100%' alignItems='flex-start' spacing={0.5}>
								<VerticalPosterTitle<MT> title={title} inView={inView} />

								{!!subtitle && <VerticalPosterSubtitle<MT> subtitle={subtitle} inView={inView} />}
							</VStack>
						</VStack>

						{(mediaType === 'person' || mediaType === 'company' || mediaType === 'collection') && (
							<>
								{/* {isTouchDevice && mediaType !== 'company' && (
									<PosterGlass
										position='absolute'
										top={1.5}
										left={1.5}
										onMouseEnter={() => setIsFixed.on()}
										onMouseLeave={() => setIsFixed.off()}
										zIndex={1}
									>
										<Quickview<MT>
											title={title}
											mediaType={mediaType}
											mediaItem={mediaItem}
											size='xs'
										/>
									</PosterGlass>
								)} */}

								<PosterGlass
									position='absolute'
									top={1.5}
									right={1.5}
									onMouseEnter={() => setIsFixed.on()}
									onMouseLeave={() => setIsFixed.off()}
									zIndex={1}
								>
									<PosterLike<MT>
										title={title}
										mediaType={mediaType}
										mediaItem={mediaItem}
										size='xs'
									/>
								</PosterGlass>
							</>
						)}
					</VStack>
				</CardBody>
			</Card>
		</InternalLink>
	);
};

export default VerticalPoster;
