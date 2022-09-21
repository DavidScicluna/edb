import { ReactElement, useContext } from 'react';

import { DummyCard, CardBody } from '@davidscicluna/component-library';

import { VStack, HStack } from '@chakra-ui/react';

import { useInView } from 'react-cool-inview';

import { isGuest as defaultIsGuest } from '../../../containers/Layout/common/data/defaultPropValues';
import { MediaType } from '../../../common/types';
import DummyRating from '../../Ratings/DummyRating';
import { LayoutContext } from '../../../containers/Layout';
import { LayoutContext as LayoutContextType } from '../../../containers/Layout/types';
import DummyPosterLike from '../components/DummyPosterLike';
import DummyPosterBookmark from '../components/DummyPosterBookmark';
import PosterGlass from '../components/PosterGlass';
import { inView as defaultInView } from '../common/data/defaultPropValues';

import { DummyVerticalPosterProps } from './types';
import DummyVerticalPosterImage from './components/DummyVerticalPosterImage';
import DummyVerticalPosterTitle from './components/DummyVerticalPosterTitle';
import DummyVerticalPosterSubtitle from './components/DummyVerticalPosterSubtitle';

const DummyVerticalPoster = <MT extends MediaType>(props: DummyVerticalPosterProps<MT>): ReactElement => {
	const { isGuest = defaultIsGuest } = useContext<LayoutContextType>(LayoutContext);

	const { observe: posterRef, inView = defaultInView } = useInView<HTMLDivElement>({
		threshold: [0.2, 0.4, 0.6, 0.8, 1],
		unobserveOnEnter: true
	});

	const { mediaType, hasSubtitle = false, isFullWidth = true, isLight = true, ...rest } = props;

	return (
		<DummyCard {...rest} isFullWidth={isFullWidth} isLight={isLight}>
			<CardBody>
				<VStack ref={posterRef} width='100%' position='relative' overflow='hidden' spacing={0}>
					{/* Image */}
					<DummyVerticalPosterImage />

					<VStack width='100%' spacing={0.5} p={1}>
						{/* Header */}
						{(mediaType === 'movie' || mediaType === 'tv') && (
							<HStack width='100%' justify='space-between' spacing={0}>
								{/* Rating */}
								<DummyRating size='md' />

								<HStack spacing={0.5}>
									{/* Quick View */}
									{/* {isTouchDevice && (
											<Quickview
												title={title}
												mediaType={mediaType}
												mediaItem={mediaItem}
												size='sm'
											/>
										)} */}

									{/* Like */}
									<DummyPosterLike size='xs' />

									{/* Bookmark */}
									<DummyPosterBookmark size='xs' />
								</HStack>
							</HStack>
						)}

						{/* Text */}
						<VStack width='100%' alignItems='flex-start' spacing={0.5}>
							<DummyVerticalPosterTitle />

							{hasSubtitle && <DummyVerticalPosterSubtitle />}
						</VStack>
					</VStack>

					{/* Like / Quick View */}
					{(mediaType === 'person' || mediaType === 'company' || mediaType === 'collection') && (
						<>
							{/* Quick View */}
							{/* {isTouchDevice && mediaType !== 'company' && (
									<PosterGlass
										position='absolute'
										top={1}
										left={2}
										onMouseEnter={() => setIsFixed.on()}
										onMouseLeave={() => setIsFixed.off()}
									>
										<Quickview
											title={title}
											mediaType={mediaType}
											mediaItem={mediaItem}
											size='sm'
										/>
									</PosterGlass>
								)} */}

							{!isGuest && (
								<PosterGlass position='absolute' top={1.5} right={1.5}>
									<DummyPosterLike size='xs' />
								</PosterGlass>
							)}
						</>
					)}
				</VStack>
			</CardBody>
		</DummyCard>
	);
};

export default DummyVerticalPoster;
