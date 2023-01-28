import { FC, useState } from 'react';

import { useTheme, useDebounce, Headline, Button, Icon, Divider, utils } from '@davidscicluna/component-library';

import { useMediaQuery, Center, VStack, Text } from '@chakra-ui/react';

import { range } from 'lodash';
import { sort } from 'fast-sort';

import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';
import {
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyIcon,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle,
	QueryEmptyActions,
	DummyHorizontalPoster,
	DummyVerticalPoster,
	VerticalGrid,
	LoadMore,
	MovieHorizontalPoster,
	MovieVerticalPoster,
	TotalBadge,
	DisplayMode
} from '../../../../../../../components';
import { useUserTheme } from '../../../../../../../common/hooks';
import { getEmptySubtitle } from '../../../../../../../components/QueryEmpty/common/utils';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';
import { PartialMovie } from '../../../../../../../common/types/movie';
import { useCollectionContext } from '../../common/hooks';

const { getColor } = utils;

const limit = 20;

const PartsTab: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing } = useLayoutContext();

	const { collectionQuery } = useCollectionContext();

	const { data: collection, isFetching, isLoading, isError, isSuccess } = collectionQuery || {};
	const { name, parts = [] } = collection || {};

	const [visible, setVisible] = useState<number>(limit);
	const visibleDebounced = useDebounce<number>(visible, 'slow');

	return (
		<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={spacing}>
			<Headline
				width='100%'
				renderCaption={() => (
					<TotalBadge
						color={color}
						colorMode={colorMode}
						prefix={`${
							name ? name : formatMediaTypeLabel({ type: 'single', mediaType: 'collection' })
						} has a total of`}
						suffix={formatMediaTypeLabel({
							type: parts.length === 1 ? 'single' : 'multiple',
							mediaType: 'movie'
						})}
						total={parts.length || 0}
					/>
				)}
				renderTitle={(props) => (
					<Text {...props}>{formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' })}</Text>
				)}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`This Tab contains all the ${formatMediaTypeLabel({
							type: 'multiple',
							mediaType: 'movie'
						})} that are part of the ${
							name ? name : formatMediaTypeLabel({ type: 'single', mediaType: 'collection' })
						}`}
					</Text>
				)}
				renderRight={() => <DisplayMode />}
				py={spacing * 2}
			/>

			<Center width='100%'>
				{!(isFetching || isLoading) && isError ? (
					<QueryEmpty
						color={color}
						colorMode={colorMode}
						borderWidth='2px'
						borderStyle='dashed'
						borderColor={getColor({ theme, colorMode, type: 'divider' })}
						borderRadius='lg'
					>
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
										label: name
											? `${name} ${formatMediaTypeLabel({
													type: 'multiple',
													mediaType: 'movie'
											  })}`
											: `${formatMediaTypeLabel({
													type: 'single',
													mediaType: 'collection'
											  })} ${formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' })}`
									})}
								</QueryEmptySubtitle>
							</QueryEmptyBody>
							<QueryEmptyActions renderActions={(props) => <Button {...props}>Try Again</Button>} />
						</QueryEmptyStack>
					</QueryEmpty>
				) : !(isFetching || isLoading) && isSuccess && parts.length === 0 ? (
					<QueryEmpty
						color={color}
						colorMode={colorMode}
						borderWidth='2px'
						borderStyle='dashed'
						borderColor={getColor({ theme, colorMode, type: 'divider' })}
						borderRadius='lg'
					>
						<QueryEmptyStack>
							<QueryEmptyBody>
								<QueryEmptyTitle />
								<QueryEmptySubtitle>
									{getEmptySubtitle({
										type: 'empty',
										label: name
											? `${name} ${formatMediaTypeLabel({
													type: 'multiple',
													mediaType: 'movie'
											  })}`
											: `${formatMediaTypeLabel({
													type: 'single',
													mediaType: 'collection'
											  })} ${formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' })}`
									})}
								</QueryEmptySubtitle>
							</QueryEmptyBody>
							<QueryEmptyActions renderActions={(props) => <Button {...props}>Try Again</Button>} />
						</QueryEmptyStack>
					</QueryEmpty>
				) : !(isFetching || isLoading) && isSuccess && parts.length > 0 ? (
					<VStack width='100%' spacing={spacing}>
						<VerticalGrid>
							{({ displayMode }) =>
								sort([...parts])
									.desc(({ release_date }) => release_date)
									.filter((_movie, index) => index < visibleDebounced)
									.map((movie: PartialMovie) =>
										displayMode === 'list' ? (
											<MovieHorizontalPoster key={movie.id} movie={movie} />
										) : (
											<MovieVerticalPoster key={movie.id} movie={movie} />
										)
									)
							}
						</VerticalGrid>

						<Center width={isSm ? '100%' : 'auto'}>
							<LoadMore
								amount={visibleDebounced}
								total={parts.length}
								label={
									name
										? `${name} ${formatMediaTypeLabel({
												type: 'multiple',
												mediaType: 'movie'
										  })}`
										: `${formatMediaTypeLabel({
												type: 'single',
												mediaType: 'collection'
										  })} ${formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' })}`
								}
								isLoading={false}
								isButtonVisible={visibleDebounced <= parts.length}
								onClick={() => setVisible((total) => total + limit)}
							/>
						</Center>
					</VStack>
				) : (
					<VStack width='100%' spacing={spacing}>
						<VerticalGrid>
							{({ displayMode }) =>
								range(20).map((_dummy, index) =>
									displayMode === 'list' ? (
										<DummyHorizontalPoster
											key={index}
											mediaType='movie'
											hasSubtitle
											hasDescription
										/>
									) : (
										<DummyVerticalPoster key={index} mediaType='movie' hasSubtitle />
									)
								)
							}
						</VerticalGrid>

						<Center width={isSm ? '100%' : 'auto'}>
							<LoadMore
								amount={0}
								total={0}
								label={
									name
										? `${name} ${formatMediaTypeLabel({
												type: 'multiple',
												mediaType: 'movie'
										  })}`
										: `${formatMediaTypeLabel({
												type: 'single',
												mediaType: 'collection'
										  })} ${formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' })}`
								}
								isDisabled
								isLoading
								isButtonVisible
							/>
						</Center>
					</VStack>
				)}
			</Center>
		</VStack>
	);
};

export default PartsTab;
