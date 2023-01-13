import { FC, useCallback } from 'react';

import { useTheme, InternalLink, Card, CardBody, Badge, BadgeLabel, utils } from '@davidscicluna/component-library';

import { useMediaQuery, useBreakpointValue, HStack, VStack, Center } from '@chakra-ui/react';

import { useInView } from 'react-cool-inview';
import dayjs from 'dayjs';

import { useUserTheme } from '../../../../../../../common/hooks';
import { formatDate, formatMediaType } from '../../../../../../../common/utils';

import { TVShowEpisodeProps } from './types';
import TVShowEpisodeOverview from './components/TVShowEpisodeOverview';
import TVShowEpisodeRating from './components/TVShowEpisodeRating';
import TVShowEpisodeDate from './components/TVShowEpisodeDate';
import TVShowEpisodeName from './components/TVShowEpisodeName';
import TVShowEpisodeImage, { width as TVShowEpisodeImageWidth } from './components/TVShowEpisodeImage';

const { convertREMToPixels, convertStringToNumber } = utils;

const spacing = 2;

const today = formatDate({ date: dayjs(new Date()).toISOString() });

const TVShowEpisode: FC<TVShowEpisodeProps> = (props) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { observe: posterRef, inView } = useInView<HTMLDivElement>({
		unobserveOnEnter: true,
		rootMargin: `-${convertREMToPixels(convertStringToNumber(theme.space[4], 'rem'))}px 0px`
	});

	const breakpointIndex = useBreakpointValue<number>({ 'base': 0, 'sm': 1, 'md': 2, 'lg': 3, 'xl': 4, '2xl': 5 });

	const { episode, badgeLabel, isDisabled = false, isFullWidth = true, isLight = true, ...rest } = props;
	const {
		show_id: showID,
		id: episodeID,
		season_number: season,
		still_path,
		air_date,
		name,
		vote_average,
		vote_count,
		overview
	} = episode;

	const isFuture = dayjs(air_date).isAfter(today);

	const handleContentWidth = useCallback(() => {
		const imageWidth = convertStringToNumber(TVShowEpisodeImageWidth[breakpointIndex || 0], 'px');
		const spacingWidth = convertREMToPixels(convertStringToNumber(theme.space[spacing], 'rem'));

		return `calc(100% - ${imageWidth + spacingWidth}px)`;
	}, [TVShowEpisodeImageWidth, spacing]);

	return (
		<InternalLink
			to={{
				pathname: `${formatMediaType({
					mediaType: 'tv'
				})}/${showID}/seasons/${season}/episodes/${episodeID}`
			}}
			isDisabled={isDisabled || isFuture}
			isFullWidth={isFullWidth}
		>
			<Card
				{...rest}
				ref={posterRef}
				colorMode={colorMode}
				isClickable={!isFuture}
				isDisabled={isDisabled}
				isFullWidth={isFullWidth}
				isLight={isLight}
			>
				<CardBody>
					<HStack width='100%' position='relative' overflow='hidden' spacing={spacing} p={spacing}>
						<TVShowEpisodeImage id={episodeID} still_path={still_path} name={name} inView={inView} />

						<VStack width={handleContentWidth()} alignItems='flex-start' spacing={spacing}>
							{vote_average && (
								<TVShowEpisodeRating vote_average={vote_average} vote_count={vote_count} />
							)}

							<VStack width='100%' alignItems='flex-start' spacing={0.5}>
								<TVShowEpisodeName name={name} inView={inView} />

								{!!air_date && <TVShowEpisodeDate air_date={air_date} inView={inView} />}
							</VStack>

							{!!overview && <TVShowEpisodeOverview overview={overview} inView={inView} />}
						</VStack>

						{badgeLabel && (
							<Center position='absolute' top={spacing} right={spacing}>
								<Badge
									color={color}
									colorMode={colorMode}
									size={isSm ? 'xs' : 'sm'}
									variant='contained'
								>
									<BadgeLabel>{badgeLabel}</BadgeLabel>
								</Badge>
							</Center>
						)}
					</HStack>
				</CardBody>
			</Card>
		</InternalLink>
	);
};

export default TVShowEpisode;
