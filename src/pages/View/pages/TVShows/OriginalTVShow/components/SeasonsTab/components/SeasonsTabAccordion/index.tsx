import { FC } from 'react';

import {
	Space,
	useTheme,
	Accordion,
	AccordionHeader,
	AccordionBody,
	Button,
	Icon
} from '@davidscicluna/component-library';

import { Text, VStack } from '@chakra-ui/react';

import { range } from 'lodash';

import {
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyIcon,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle,
	QueryEmptyActions,
	TotalBadge,
	VerticalGrid,
	DummyParagraph,
	Paragraph
} from '../../../../../../../../../components';
import { useTVShowSeasonQuery } from '../../../../../../../../../common/queries';
import { useUserTheme } from '../../../../../../../../../common/hooks';
import { getEmptySubtitle } from '../../../../../../../../../components/QueryEmpty/common/utils';
import { formatDate, formatMediaTypeLabel } from '../../../../../../../../../common/utils';
import ViewEpisode from '../../../../../../../components/ViewEpisode';
import ViewDummyEpisode from '../../../../../../../components/ViewDummyEpisode';
import { useTVShowContext } from '../../../../common/hooks';

import { SeasonsTabAccordionProps } from './types';

const spacing: Space = 2;

const SeasonsTabAccordion: FC<SeasonsTabAccordionProps> = (props) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { showQuery } = useTVShowContext();

	const { data: show } = showQuery || {};
	const { id: showID } = show || {};

	const { id, title, season: partialSeason, isOpen = false } = props;
	const { season_number: seasonNumber } = partialSeason;

	const {
		data: fullSeason,
		isFetching,
		isLoading,
		isError,
		isSuccess,
		refetch
	} = useTVShowSeasonQuery({ props: { id: showID, season: seasonNumber } });

	const { air_date, episodes = [], overview } = fullSeason || {};

	return (
		<Accordion
			key={id}
			id={id}
			header={
				<AccordionHeader
					renderTitle={(props) => <Text {...props}>{title}</Text>}
					renderSubtitle={
						air_date
							? (props) => (
									<Text {...props}>
										{`${title ? title : `Season ${seasonNumber}`} was released on ${formatDate({
											date: air_date
										})}`}
									</Text>
							  )
							: undefined
					}
					actions={
						<TotalBadge
							color={isOpen ? color : 'gray'}
							colorMode={colorMode}
							prefix='Total of'
							suffix={`Episode${episodes.length === 1 ? '' : 's'}`}
							total={episodes.length}
							variant={isOpen ? 'contained' : 'outlined'}
						/>
					}
					spacing={1}
				/>
			}
			body={
				<AccordionBody>
					{!(isFetching || isLoading) && isError ? (
						<QueryEmpty color={color} colorMode={colorMode}>
							<QueryEmptyStack>
								<QueryEmptyIcon
									renderIcon={(props) => (
										<Icon
											{...props}
											width={theme.fontSizes['6xl']}
											height={theme.fontSizes['6xl']}
											fontSize={theme.fontSizes['6xl']}
											icon='error_outline'
										/>
									)}
									p={2}
								/>
								<QueryEmptyBody>
									<QueryEmptyTitle />
									<QueryEmptySubtitle>
										{getEmptySubtitle({
											type: 'error',
											label: `${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })} Season`
										})}
									</QueryEmptySubtitle>
								</QueryEmptyBody>

								<QueryEmptyActions
									renderActions={(props) => (
										<Button {...props} onClick={refetch}>
											Try Again
										</Button>
									)}
								/>
							</QueryEmptyStack>
						</QueryEmpty>
					) : !(isFetching || isLoading) && isSuccess && episodes.length === 0 ? (
						<QueryEmpty color={color} colorMode={colorMode}>
							<QueryEmptyStack>
								<QueryEmptyBody>
									<QueryEmptyTitle />
									<QueryEmptySubtitle>
										{getEmptySubtitle({
											type: 'empty',
											label: `${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })} Season`
										})}
									</QueryEmptySubtitle>
								</QueryEmptyBody>
							</QueryEmptyStack>
						</QueryEmpty>
					) : !(isFetching || isLoading) && isSuccess && episodes.length > 0 ? (
						<VStack width='100%' spacing={spacing}>
							{isFetching || isLoading ? (
								<DummyParagraph />
							) : overview ? (
								<Paragraph title='Synopsis' keepFooter>
									{overview}
								</Paragraph>
							) : null}

							<VerticalGrid displayMode='list' spacing={spacing}>
								{() =>
									episodes.map((episode) => (
										<ViewEpisode
											key={episode.id}
											episode={episode}
											badgeLabel={
												episode.episode_number ? `Episode ${episode.episode_number}` : undefined
											}
										/>
									))
								}
							</VerticalGrid>
						</VStack>
					) : (
						<VStack width='100%' spacing={spacing}>
							<DummyParagraph />

							<VerticalGrid displayMode='list' spacing={spacing}>
								{() =>
									range(20).map((_dummy, index) => (
										<ViewDummyEpisode key={index} hasDate hasOverview />
									))
								}
							</VerticalGrid>
						</VStack>
					)}
				</AccordionBody>
			}
			spacing={spacing}
			p={spacing}
		/>
	);
};

export default SeasonsTabAccordion;
