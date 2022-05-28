import { ReactElement, memo } from 'react';

import { Card, CardBody } from '@davidscicluna/component-library';
import { useBoolean, useConst, VStack, HStack, Center } from '@chakra-ui/react';
import { useInView } from 'react-cool-inview';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { useSelector } from '../../../common/hooks';
import { MediaType } from '../../../common/types';
import { handleIsTouchDevice, handleReturnMediaTypeLabel } from '../../../common/utils';
import Link from '../../../components/Clickable/Link';
import { guest } from '../../../store/slices/Users';
import Rating from '../../Rating';
import Bookmark from '../components/Bookmark';
import Like from '../components/Like';
import Quickview from '../components/Quickview';

import { VerticalPosterProps } from './types';
import Title from './components/Title';
import Subtitle from './components/Subtitle';
import Image from './components/Image';

const isTouchDevice: boolean = handleIsTouchDevice();

const VerticalPoster = <MT extends MediaType>(props: VerticalPosterProps<MT>): ReactElement => {
	const { observe: ref, inView } = useInView<HTMLDivElement>({
		threshold: [0.2, 0.4, 0.6, 0.8, 1],
		unobserveOnEnter: true
	});

	const user = useSelector((state) => state.app.data.user);

	const { width = '100%', mediaItem, mediaType, image, rating, title, subtitle, isLoading = true } = props;

	const [isFocused, setIsFocused] = useBoolean();
	const [isHovering, setIsHovering] = useBoolean();

	const [isDisabled, setIsDisabled] = useBoolean();

	const isGuest = useConst<boolean>(guest.data.id === user);

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
			<Card isFullWidth isDisabled={isLoading} isClickable={mediaType !== 'company'} isLight>
				<CardBody>
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
										{/* Quick View component */}
										{isTouchDevice ? (
											<Center
												onMouseEnter={() => setIsDisabled.on()}
												onMouseLeave={() => setIsDisabled.off()}
											>
												<Quickview
													title={title}
													mediaType={mediaType}
													mediaItem={mediaItem}
													isLoading={isLoading}
													size='sm'
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
													size='sm'
													isLoading={isLoading}
												/>
											</Center>
										) : null}
										{/* List component */}
										{!isGuest ? (
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
										) : null}
									</Center>
								</HStack>
							) : null}

							{/* Text */}
							<VStack width='100%' alignItems='flex-start' spacing={isLoading ? 0.5 : 0.25}>
								<Title title={title} isLoading={isLoading} inView={inView} />
								{!(isNil(subtitle) || isEmpty(subtitle)) || isLoading ? (
									<Subtitle subtitle={subtitle} isLoading={isLoading} inView={inView} />
								) : null}
							</VStack>
						</VStack>

						{/* Like / Quick View component */}
						{mediaType === 'person' || mediaType === 'company' || mediaType === 'collection' ? (
							<>
								{/* Quick View component */}
								{isTouchDevice && mediaType !== 'company' ? (
									<Center
										sx={{
											position: 'absolute',
											top: 1,
											left: 2
										}}
									>
										<Center
											onMouseEnter={() => setIsDisabled.on()}
											onMouseLeave={() => setIsDisabled.off()}
										>
											<Quickview
												title={title}
												mediaType={mediaType}
												mediaItem={mediaItem}
												isLoading={isLoading}
												size='sm'
											/>
										</Center>
									</Center>
								) : null}
								{!isGuest ? (
									<Center
										sx={{
											position: 'absolute',
											top: 1,
											right: 2
										}}
									>
										<Center
											onMouseEnter={() => setIsDisabled.on()}
											onMouseLeave={() => setIsDisabled.off()}
										>
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
							</>
						) : null}
					</VStack>
				</CardBody>
			</Card>
		</Link>
	);
};

export default memo(VerticalPoster);
