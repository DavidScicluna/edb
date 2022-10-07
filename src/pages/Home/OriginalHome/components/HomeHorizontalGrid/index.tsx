import { FC, useCallback, Fragment } from 'react';

import { useTheme, InternalLink, Button, Divider, Icon, utils } from '@davidscicluna/component-library';

import { useMediaQuery, Text } from '@chakra-ui/react';

import { compact, includes, range } from 'lodash';

import { useUserTheme } from '../../../../../common/hooks';
import {
	HorizontalGridTabbed,
	HorizontalGridTabbedHeader,
	HorizontalGridTabbedBody,
	HorizontalGridTabbedFooter,
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyIcon,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle,
	QueryEmptyActions,
	DummyVerticalPoster
} from '../../../../../components';
import { formatMediaTypeLabel } from '../../../../../common/utils';
import { getEmptySubtitle } from '../../../../../components/QueryEmpty/common/utils';
import MovieVerticalPoster from '../../../../Movies/components/Posters/MovieVerticalPoster';
import TVShowVerticalPoster from '../../../../TV/components/Posters/TVShowVerticalPoster';
import PersonVerticalPoster from '../../../../People/components/Posters/PersonVerticalPoster';

import { HomeHorizontalGridProps } from './types';

const { getColor } = utils;

// TODO: Extract vertical poster widths into method
export const width = ['185px', '205px', '230px'];

const HomeHorizontalGrid: FC<HomeHorizontalGridProps> = (props) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { activeTab = 0, title, subtitle, to, mediaTypes, data, isLoading, isError, isSuccess, onChange } = props;

	const handleIsDisabled = useCallback((): boolean => {
		switch (activeTab) {
			case 0:
				return isLoading.movie || isError.movie || false;
			case 1:
				return isLoading.tv || isError.tv || false;
			case 2:
				return isLoading.person || isError.person || false;
			default:
				return true;
		}
	}, [isLoading, isError]);

	return (
		<HorizontalGridTabbed
			color={color}
			colorMode={colorMode}
			activeTab={activeTab}
			onChange={onChange}
			isDisabled={handleIsDisabled()}
			cardProps={{ isDivisible: false, isFullWidth: true, p: 2, spacing: 2 }}
			sx={{ width: '100%' }}
		>
			<HorizontalGridTabbedHeader
				cardHeaderProps={{
					renderTitle: (props) => <Text {...props}>{title}</Text>,
					renderSubtitle: subtitle ? (props) => <Text {...props}>{subtitle}</Text> : undefined,
					pb: 2
				}}
				arrowProps={{ variant: 'icon' }}
				tabListProps={{
					tabs: compact([
						includes(mediaTypes, 'movie')
							? {
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' })
							  }
							: null,
						includes(mediaTypes, 'tv')
							? {
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'tv' })
							  }
							: null,
						includes(mediaTypes, 'person')
							? {
									label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'person' })
							  }
							: null
					])
				}}
				divider={<Divider colorMode={colorMode} />}
				spacing={0}
			/>
			<HorizontalGridTabbedBody>
				<Fragment key='ds-edb-home-horizontal-grid-movies-tab'>
					{!isLoading.movie && isError.movie ? (
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
											label: `${title} ${formatMediaTypeLabel({
												type: 'multiple',
												mediaType: 'movie'
											})}`
										})}
									</QueryEmptySubtitle>
								</QueryEmptyBody>
								<QueryEmptyActions renderActions={(props) => <Button {...props}>Try Again</Button>} />
							</QueryEmptyStack>
						</QueryEmpty>
					) : !isLoading.movie && isSuccess.movie && data.movie && data.movie.length === 0 ? (
						<QueryEmpty color={color} colorMode={colorMode}>
							<QueryEmptyStack>
								<QueryEmptyBody>
									<QueryEmptyTitle />
									<QueryEmptySubtitle>
										{getEmptySubtitle({
											type: 'empty',
											label: `${title} ${formatMediaTypeLabel({
												type: 'multiple',
												mediaType: 'movie'
											})}`
										})}
									</QueryEmptySubtitle>
								</QueryEmptyBody>
								<QueryEmptyActions renderActions={(props) => <Button {...props}>Try Again</Button>} />
							</QueryEmptyStack>
						</QueryEmpty>
					) : !isLoading.movie && isSuccess.movie && data.movie && data.movie.length > 0 ? (
						data.movie.map((movie) => <MovieVerticalPoster key={movie.id} movie={movie} sx={{ width }} />)
					) : (
						range(20).map((_dummy, index) => (
							<DummyVerticalPoster key={index} mediaType='movie' hasSubtitle sx={{ width }} />
						))
					)}
				</Fragment>

				<Fragment key='ds-edb-home-horizontal-grid-tv-shows-tab'>
					{!isLoading.tv && isError.tv ? (
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
											label: `${title} ${formatMediaTypeLabel({
												type: 'multiple',
												mediaType: 'tv'
											})}`
										})}
									</QueryEmptySubtitle>
								</QueryEmptyBody>
								<QueryEmptyActions renderActions={(props) => <Button {...props}>Try Again</Button>} />
							</QueryEmptyStack>
						</QueryEmpty>
					) : !isLoading.tv && isSuccess.tv && data.tv && data.tv.length === 0 ? (
						<QueryEmpty color={color} colorMode={colorMode}>
							<QueryEmptyStack>
								<QueryEmptyBody>
									<QueryEmptyTitle />
									<QueryEmptySubtitle>
										{getEmptySubtitle({
											type: 'empty',
											label: `${title} ${formatMediaTypeLabel({
												type: 'multiple',
												mediaType: 'tv'
											})}`
										})}
									</QueryEmptySubtitle>
								</QueryEmptyBody>
								<QueryEmptyActions renderActions={(props) => <Button {...props}>Try Again</Button>} />
							</QueryEmptyStack>
						</QueryEmpty>
					) : !isLoading.tv && isSuccess.tv && data.tv && data.tv.length > 0 ? (
						data.tv.map((show) => <TVShowVerticalPoster key={show.id} show={show} sx={{ width }} />)
					) : (
						range(20).map((_dummy, index) => (
							<DummyVerticalPoster key={index} mediaType='tv' hasSubtitle sx={{ width }} />
						))
					)}
				</Fragment>

				<Fragment key='ds-edb-home-horizontal-grid-people-tab'>
					{!isLoading.person && isError.person ? (
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
											label: `${title} ${formatMediaTypeLabel({
												type: 'multiple',
												mediaType: 'tv'
											})}`
										})}
									</QueryEmptySubtitle>
								</QueryEmptyBody>
								<QueryEmptyActions renderActions={(props) => <Button {...props}>Try Again</Button>} />
							</QueryEmptyStack>
						</QueryEmpty>
					) : !isLoading.person && isSuccess.person && data.person && data.person.length === 0 ? (
						<QueryEmpty color={color} colorMode={colorMode}>
							<QueryEmptyStack>
								<QueryEmptyBody>
									<QueryEmptyTitle />
									<QueryEmptySubtitle>
										{getEmptySubtitle({
											type: 'empty',
											label: `${title} ${formatMediaTypeLabel({
												type: 'multiple',
												mediaType: 'tv'
											})}`
										})}
									</QueryEmptySubtitle>
								</QueryEmptyBody>
								<QueryEmptyActions renderActions={(props) => <Button {...props}>Try Again</Button>} />
							</QueryEmptyStack>
						</QueryEmpty>
					) : !isLoading.person && isSuccess.person && data.person && data.person.length > 0 ? (
						data.person.map((person) => (
							<PersonVerticalPoster key={person.id} person={person} sx={{ width }} />
						))
					) : (
						range(20).map((_dummy, index) => (
							<DummyVerticalPoster key={index} mediaType='person' hasSubtitle sx={{ width }} />
						))
					)}
				</Fragment>
			</HorizontalGridTabbedBody>
			<HorizontalGridTabbedFooter
				borderTopWidth='2px'
				borderTopStyle='solid'
				borderTopColor={getColor({ theme, colorMode, type: 'divider' })}
				pt={2}
			>
				<InternalLink to={to({ mediaType: mediaTypes[activeTab] })} isFullWidth isDisabled={handleIsDisabled()}>
					<Button
						color={color}
						colorMode={colorMode}
						isFullWidth
						isDisabled={handleIsDisabled()}
						size={isSm ? 'xs' : 'sm'}
						variant='text'
					>
						{`View all ${title} ${formatMediaTypeLabel({
							type: 'multiple',
							mediaType: mediaTypes[activeTab]
						})}`}
					</Button>
				</InternalLink>
			</HorizontalGridTabbedFooter>
		</HorizontalGridTabbed>
	);
};

export default HomeHorizontalGrid;
