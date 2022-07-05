import { ReactElement, memo } from 'react';

import { FontSize, Card, CardBody } from '@davidscicluna/component-library';

import { useMediaQuery, useBreakpointValue, useBoolean, useConst, HStack, VStack, Center } from '@chakra-ui/react';

import { useInView } from 'react-cool-inview';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { useSelector } from '../../../common/hooks';
import { MediaType } from '../../../common/types';
import { handleReturnMediaTypeLabel } from '../../../common/utils';
import { guest } from '../../../store/slices/Users';
import Link from '../../Clickable/Link';
import Rating from '../../Rating';
import Bookmark from '../components/Bookmark';
import Like from '../components/Like';
import Quickview from '../components/Quickview';

import { HorizontalPosterProps } from './types';
import Title from './components/Title';
import Subtitle from './components/Subtitle';
import Image from './components/Image';
import Description from './components/Description';

const HorizontalPoster = <MT extends MediaType>(props: HorizontalPosterProps<MT>): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');
	const ratingFontSize = useBreakpointValue<Exclude<FontSize, '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl'>>({
		'base': 'sm',
		'sm': 'md',
		'md': 'lg',
		'lg': 'xl',
		'xl': '2xl',
		'2xl': '3xl'
	});

	const { observe: ref, inView } = useInView<HTMLDivElement>({
		threshold: [0.2, 0.4, 0.6, 0.8, 1],
		unobserveOnEnter: true
	});

	const user = useSelector((state) => state.app.data.user);

	const { mediaItem, mediaType, image, rating, title, subtitle, description, isLoading = true } = props;

	const [isDisabled, setIsDisabled] = useBoolean();

	const isGuest = useConst<boolean>(guest.data.id === user);

	return (
		<Link
			isFullWidth
			isDisabled={isLoading || isDisabled || mediaType === 'company'}
			to={
				mediaType !== 'company'
					? { pathname: `/${handleReturnMediaTypeLabel(mediaType)}/${mediaItem?.id || ''}` }
					: {}
			}
		>
			<Card isFullWidth isDisabled={isLoading} isClickable={mediaType !== 'company'} isLight>
				<CardBody>
					<HStack
						ref={ref}
						width='100%'
						position='relative'
						spacing={[1, 1, 2, 2, 2, 2]}
						p={[1, 1, 2, 2, 2, 2]}
					>
						{/* Image */}
						<Image mediaType={mediaType} image={image} isLoading={isLoading} inView={inView} />

						<VStack
							width={[
								'calc(100% - 108px)',
								'calc(100% - 124px)',
								'calc(100% - 168px)',
								'calc(100% - 204px)',
								'calc(100% - 204px)',
								'calc(100% - 240px)'
							]}
							alignItems='flex-start'
							spacing={[
								isLoading ? 2 : 1,
								isLoading ? 2 : 1,
								isLoading ? 4 : 2,
								isLoading ? 4 : 2,
								isLoading ? 4 : 2,
								isLoading ? 4 : 2
							]}
						>
							{/* Rating */}
							{(mediaType === 'movie' || mediaType === 'tv') && rating ? (
								<Rating
									count={rating?.count}
									inView={inView}
									size={ratingFontSize}
									isLoading={isLoading}
								>
									{rating?.rating}
								</Rating>
							) : null}

							<VStack
								width='100%'
								alignItems='flex-start'
								spacing={[
									isLoading ? 0.5 : 0.25,
									isLoading ? 0.5 : 0.25,
									isLoading ? 1 : 0.5,
									isLoading ? 1 : 0.5,
									isLoading ? 1 : 0.5,
									isLoading ? 1 : 0.5
								]}
							>
								<Title title={title} isLoading={isLoading} inView={inView} />
								{!(isNil(subtitle) || isEmpty(subtitle)) || isLoading ? (
									<Subtitle subtitle={subtitle} isLoading={isLoading} inView={inView} />
								) : null}
							</VStack>

							{!(isNil(description) || isEmpty(description)) || isLoading ? (
								<Description description={description} isLoading={isLoading} inView={inView} />
							) : null}
						</VStack>

						{/* Like / List Icon / Quick View buttons */}
						<Center
							sx={{
								position: 'absolute',
								top: 1,
								right: 1
							}}
						>
							{/* Quick View component */}
							{mediaType !== 'company' ? (
								<Center
									onMouseEnter={() => setIsDisabled.on()}
									onMouseLeave={() => setIsDisabled.off()}
								>
									<Quickview
										title={title}
										mediaType={mediaType}
										mediaItem={mediaItem}
										isLoading={isLoading}
										size={isSm ? 'md' : 'lg'}
									/>
								</Center>
							) : null}
							{/* Like component */}
							{!isGuest ? (
								<Center
									onMouseEnter={() => setIsDisabled.on()}
									onMouseLeave={() => setIsDisabled.off()}
								>
									<Like
										title={title}
										mediaType={mediaType}
										mediaItem={mediaItem}
										isLoading={isLoading}
										size={isSm ? 'md' : 'lg'}
									/>
								</Center>
							) : null}
							{/* List component */}
							{!isGuest && (mediaType === 'movie' || mediaType === 'tv') ? (
								<Center
									onMouseEnter={() => setIsDisabled.on()}
									onMouseLeave={() => setIsDisabled.off()}
								>
									<Bookmark
										title={title}
										mediaType={mediaType}
										mediaItem={mediaItem}
										isLoading={isLoading}
										size={isSm ? 'md' : 'lg'}
									/>
								</Center>
							) : null}
						</Center>
					</HStack>
				</CardBody>
			</Card>
		</Link>
	);
};

export default memo(HorizontalPoster);
