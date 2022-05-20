import { ReactElement } from 'react';

import { useMediaQuery, useBreakpointValue, HStack, VStack, Center, Fade } from '@chakra-ui/react';

import { useInView } from 'react-cool-inview';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { handleReturnImageSize } from '../../../../../../../../../../../../common/utils';
import Badge from '../../../../../../../../../../../../components/Badge';
import Card from '../../../../../../../../../../../../components/Clickable/Card';
import Link from '../../../../../../../../../../../../components/Clickable/Link';
import Rating from '../../../../../../../../../../../../components/Rating';
import { FontSizes } from '../../../../../../../../../../../../theme/types';

import { EpisodeProps } from './types';
import Overview from './components/Overview';
import Name from './components/Name';
import Image from './components/Image';
import Date from './components/Date';

dayjs.extend(isSameOrAfter);

const thumbnail = handleReturnImageSize('still', 'thumbnail');
const full = handleReturnImageSize('still', 'full');

const Episode = (props: EpisodeProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');
	const [isMd] = useMediaQuery('(max-width: 992px)');

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

	const { showId, episode, isLoading = true } = props;
	const {
		still_path,
		vote_average,
		vote_count,
		name,
		air_date,
		overview,
		season_number: season,
		episode_number
	} = episode || {};

	const isFuture = dayjs().isSameOrAfter(air_date);

	return (
		<Link
			isFullWidth
			isDisabled={isLoading || isFuture}
			to={{ pathname: `/tvshows/${showId}/season/${season}/episode/${episode_number}` }}
		>
			<Card isFullWidth isDisabled={isLoading} isClickable={!isFuture} isLight>
				<HStack ref={ref} width='100%' position='relative' spacing={[1, 1, 2, 2, 2, 2]} p={[1, 1, 2, 2, 2, 2]}>
					{/* Image */}
					<Image
						image={{
							alt: `${name ? `"${name}" episode` : 'Episode'} poster`,
							src: still_path || '',
							size: { thumbnail, full }
						}}
						isLoading={isLoading}
						inView={inView}
					/>

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
						<Rating count={vote_count} inView={inView} size={ratingFontSize} isLoading={isLoading}>
							{vote_average}
						</Rating>

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
							<Name name={name} isLoading={isLoading} inView={inView} />
							{!(isNil(air_date) || isEmpty(air_date)) || isLoading ? (
								<Date date={air_date} isLoading={isLoading} inView={inView} />
							) : null}
						</VStack>
						{!(isNil(overview) || isEmpty(overview)) || isLoading ? (
							<Overview overview={overview} isLoading={isLoading} inView={inView} />
						) : null}
					</VStack>

					{/* Episode Number */}
					<Center
						as={Fade}
						in={!isNil(episode_number) && inView}
						unmountOnExit
						sx={{
							position: 'absolute',
							top: 2,
							right: 2
						}}
					>
						<Badge size={isSm ? 'xs' : isMd ? 'sm' : 'md'}>{`Episode ${episode_number}`}</Badge>
					</Center>
				</HStack>
			</Card>
		</Link>
	);
};

export default Episode;
