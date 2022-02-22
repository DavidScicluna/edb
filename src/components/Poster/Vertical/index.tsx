import { ReactElement } from 'react';
import useInView from 'react-cool-inview';

import { useBoolean, VStack, Center, HStack } from '@chakra-ui/react';

import _ from 'lodash';

import Image from './components/Image';
import Subtitle from './components/Subtitle';
import Title from './components/Title';
import { VerticalPosterProps } from './types';

import { MediaType } from '../../../common/types';
import { handleReturnMediaTypeLabel } from '../../../common/utils';
import Card from '../../../components/Clickable/Card';
import Link from '../../../components/Clickable/Link';
import Rating from '../../Rating';
import Bookmark from '../components/Bookmark';
import Like from '../components/Like';

const VerticalPoster = <MT extends MediaType>(props: VerticalPosterProps<MT>): ReactElement => {
	const { observe: ref, inView } = useInView<HTMLDivElement>({
		threshold: [0.2, 0.4, 0.6, 0.8, 1],
		unobserveOnEnter: true
	});

	const { width = '100%', mediaItem, mediaType, image, rating, title, subtitle, isLoading = true } = props;

	const [isFocused, setIsFocused] = useBoolean();
	const [isHovering, setIsHovering] = useBoolean();

	const [isDisabled, setIsDisabled] = useBoolean();

	const handleOnImageChange = (bool: boolean): void => {
		if (bool) {
			setIsDisabled.on();
		} else {
			setIsDisabled.off();
		}
	};

	return (
		<Link
			isFullWidth
			isDisabled={isLoading || isDisabled || mediaType === 'company'}
			to={
				mediaType !== 'company'
					? { pathname: `/${handleReturnMediaTypeLabel(mediaType)}/${mediaItem?.id || ''}` }
					: {}
			}
			onFocus={() => setIsFocused.on()}
			onBlur={() => setIsFocused.off()}
			onMouseEnter={() => setIsHovering.on()}
			onMouseLeave={() => setIsHovering.off()}
		>
			<Card isFullWidth isDisabled={isLoading} isClickable={mediaType !== 'company'} isFixed={isDisabled} isLight>
				<VStack ref={ref} width={width} position='relative' spacing={1} p={1}>
					{/* Image */}
					<Image
						mediaItem={mediaItem}
						mediaType={mediaType}
						image={image}
						title={title}
						isFocused={isFocused}
						isHovering={isHovering}
						isLoading={isLoading}
						inView={inView}
						onMouseChange={handleOnImageChange}
					/>

					<VStack width='100%' spacing={isLoading ? 1 : 0.5}>
						{/* Header */}
						{mediaType === 'movie' || mediaType === 'tv' ? (
							<HStack width='100%' justify='space-between'>
								{/* Rating component */}
								<Rating size='md' inView={inView} isLoading={isLoading}>
									{rating}
								</Rating>

								<Center>
									{/* Like component */}
									<Center
										onMouseEnter={() => setIsDisabled.on()}
										onMouseLeave={() => setIsDisabled.off()}
									>
										<Like
											title={title}
											mediaType={mediaType}
											mediaItem={mediaItem}
											size='sm'
											isLoading={isLoading}
										/>
									</Center>
									{/* List component */}
									<Center
										onMouseEnter={() => setIsDisabled.on()}
										onMouseLeave={() => setIsDisabled.off()}
									>
										<Bookmark
											title={title}
											mediaType={mediaType}
											mediaItem={mediaItem}
											isLoading={isLoading}
											size='sm'
										/>
									</Center>
								</Center>
							</HStack>
						) : null}

						{/* Text */}
						<VStack width='100%' alignItems='flex-start' spacing={isLoading ? 0.5 : 0.25}>
							<Title title={title} isLoading={isLoading} inView={inView} />
							{(!_.isNil(subtitle) && !_.isEmpty(subtitle)) || isLoading ? (
								<Subtitle subtitle={subtitle} isLoading={isLoading} inView={inView} />
							) : null}
						</VStack>
					</VStack>

					{/* Like component */}
					{mediaType === 'person' || mediaType === 'company' || mediaType === 'collection' ? (
						<Center
							sx={{
								position: 'absolute',
								top: 1,
								right: 2
							}}
						>
							<Center onMouseEnter={() => setIsDisabled.on()} onMouseLeave={() => setIsDisabled.off()}>
								<Like
									title={title}
									mediaType={mediaType}
									mediaItem={mediaItem}
									isLoading={isLoading}
									size='sm'
								/>
							</Center>
						</Center>
					) : null}
				</VStack>
			</Card>
		</Link>
	);
};

export default VerticalPoster;
