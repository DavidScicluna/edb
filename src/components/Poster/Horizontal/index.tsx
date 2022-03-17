import { ReactElement, memo } from 'react';
import useInView from 'react-cool-inview';

import { useMediaQuery, useBreakpointValue, useBoolean, HStack, VStack, Center } from '@chakra-ui/react';

import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import Description from './components/Description';
import Image from './components/Image';
import Subtitle from './components/Subtitle';
import Title from './components/Title';
import { HorizontalPosterProps } from './types';

import { MediaType } from '../../../common/types';
import { handleReturnMediaTypeLabel } from '../../../common/utils';
import { FontSizes } from '../../../theme/types';
import Card from '../..//Clickable/Card';
import Link from '../../Clickable/Link';
import Rating from '../../Rating';
import Bookmark from '../components/Bookmark';
import Like from '../components/Like';
import Quickview from '../components/Quickview';

const HorizontalPoster = <MT extends MediaType>(props: HorizontalPosterProps<MT>): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');
	const ratingFontSize = useBreakpointValue<keyof Omit<FontSizes, '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl'>>({
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

	const { mediaItem, mediaType, image, rating, title, subtitle, description, isLoading = true } = props;

	const [isDisabled, setIsDisabled] = useBoolean();

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
			<Card isFullWidth isDisabled={isLoading} isClickable={mediaType !== 'company'} isFixed={isDisabled} isLight>
				<HStack ref={ref} width='100%' position='relative' spacing={[1, 1, 2, 2, 2, 2]} p={[1, 1, 2, 2, 2, 2]}>
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
							<Rating count={rating?.count} inView={inView} size={ratingFontSize} isLoading={isLoading}>
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
							<Center onMouseEnter={() => setIsDisabled.on()} onMouseLeave={() => setIsDisabled.off()}>
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
						<Center onMouseEnter={() => setIsDisabled.on()} onMouseLeave={() => setIsDisabled.off()}>
							<Like
								title={title}
								mediaType={mediaType}
								mediaItem={mediaItem}
								isLoading={isLoading}
								size={isSm ? 'md' : 'lg'}
							/>
						</Center>
						{/* List component */}
						{mediaType === 'movie' || mediaType === 'tv' ? (
							<Center onMouseEnter={() => setIsDisabled.on()} onMouseLeave={() => setIsDisabled.off()}>
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
			</Card>
		</Link>
	);
};

export default memo(HorizontalPoster);
