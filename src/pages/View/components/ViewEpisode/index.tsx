import { FC, useCallback } from 'react';

import { useTheme, InternalLink, Card, CardBody, Badge, BadgeLabel, utils } from '@davidscicluna/component-library';

import { useMediaQuery, useBreakpointValue, HStack, VStack, Center } from '@chakra-ui/react';

import { useInView } from 'react-cool-inview';
import dayjs from 'dayjs';

import { useUserTheme } from '../../../../common/hooks';
import { formatDate, formatMediaType } from '../../../../common/utils';

import { ViewEpisodeProps } from './types';
import ViewEpisodeOverview from './components/ViewEpisodeOverview';
import ViewEpisodeRating from './components/ViewEpisodeRating';
import ViewEpisodeDate from './components/ViewEpisodeDate';
import ViewEpisodeName from './components/ViewEpisodeName';
import ViewEpisodeImage, { width as ViewEpisodeImageWidth } from './components/ViewEpisodeImage';

const { convertREMToPixels, convertStringToNumber } = utils;

const spacing = 2;

const today = formatDate({ date: dayjs(new Date()).toISOString() });

const ViewEpisode: FC<ViewEpisodeProps> = (props) => {
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
		season_number: seasonNumber,
		episode_number: episodeNumber,
		still_path,
		air_date,
		name,
		vote_average,
		vote_count,
		overview
	} = episode;

	const isFuture = dayjs(air_date).isAfter(today);

	const handleContentWidth = useCallback(() => {
		const imageWidth = convertStringToNumber(ViewEpisodeImageWidth[breakpointIndex || 0], 'px');
		const spacingWidth = convertREMToPixels(convertStringToNumber(theme.space[spacing], 'rem'));

		return `calc(100% - ${imageWidth + spacingWidth}px)`;
	}, [ViewEpisodeImageWidth, spacing]);

	return (
		<InternalLink
			to={{
				pathname: `/${formatMediaType({
					mediaType: 'tv'
				})}/${showID}/seasons/${seasonNumber}/episodes/${episodeNumber}`
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
						<ViewEpisodeImage id={episodeID} still_path={still_path} name={name} inView={inView} />

						<VStack width={handleContentWidth()} alignItems='flex-start' spacing={spacing}>
							{vote_average && <ViewEpisodeRating vote_average={vote_average} vote_count={vote_count} />}

							<VStack width='100%' alignItems='flex-start' spacing={0.5}>
								<ViewEpisodeName name={name} inView={inView} />

								{!!air_date && <ViewEpisodeDate air_date={air_date} inView={inView} />}
							</VStack>

							{!!overview && <ViewEpisodeOverview overview={overview} inView={inView} />}
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

export default ViewEpisode;
