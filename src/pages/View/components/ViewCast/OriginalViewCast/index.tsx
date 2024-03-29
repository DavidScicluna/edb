import { ReactElement, useState } from 'react';

import { useTheme, useDebounce, Button, Icon, utils, Undefinable } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Center } from '@chakra-ui/react';

import { range } from 'lodash';

import { useUserTheme } from '../../../../../common/hooks';
import {
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyIcon,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle,
	QueryEmptyActions,
	VerticalGrid,
	LoadMore,
	DummyHorizontalPoster,
	DummyVerticalPoster,
	PersonHorizontalPoster,
	PersonVerticalPoster
} from '../../../../../components';
import { formatMediaTypeLabel } from '../../../../../common/utils';
import { getEmptySubtitle } from '../../../../../components/QueryEmpty/common/utils';
import { useLayoutContext } from '../../../../../containers/Layout/common/hooks';
import { ViewCastMediaType } from '../common/types';

import { ViewCastGetType, ViewCastProps } from './types';

const { getColor } = utils;

const limit = 20;

const ViewCast = <MT extends ViewCastMediaType>(props: ViewCastProps<MT>): ReactElement => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing } = useLayoutContext();

	const {
		mediaType,
		cast = [],
		name,
		isFetching = false,
		isLoading = false,
		isError = false,
		isSuccess = false,
		refetch
	} = props;

	const [visible, setVisible] = useState<number>(limit);
	const visibleDebounced = useDebounce<number>(visible, 'slow');

	const handleGetSubtitle = (person: ViewCastGetType<MT>): Undefinable<string> => {
		switch (mediaType) {
			case 'movie': {
				const { character } = person as ViewCastGetType<'movie'>;
				return character ? `As ${character}` : undefined;
			}
			case 'tv': {
				const { roles = [] } = person as ViewCastGetType<'tv'>;
				return roles.length > 0
					? roles
							.map(({ episode_count = 0, character }) =>
								episode_count > 0
									? `${episode_count} episode${episode_count === 1 ? '' : 's'} as ${character}`
									: `As ${character}`
							)
							.join(', ')
					: undefined;
			}
			default:
				break;
		}
	};

	return !(isFetching || isLoading) && isError ? (
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
								? `"${name}" ${formatMediaTypeLabel({ type: 'single', mediaType })} Cast`
								: `${formatMediaTypeLabel({ type: 'single', mediaType })} Cast`
						})}
					</QueryEmptySubtitle>
				</QueryEmptyBody>

				{refetch && (
					<QueryEmptyActions
						renderActions={(props) => (
							<Button {...props} onClick={refetch}>
								Try Again
							</Button>
						)}
					/>
				)}
			</QueryEmptyStack>
		</QueryEmpty>
	) : !(isFetching || isLoading) && isSuccess && cast.length === 0 ? (
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
								? `"${name}" ${formatMediaTypeLabel({ type: 'single', mediaType })} Cast`
								: `${formatMediaTypeLabel({ type: 'single', mediaType })} Cast`
						})}
					</QueryEmptySubtitle>
				</QueryEmptyBody>
			</QueryEmptyStack>
		</QueryEmpty>
	) : !(isFetching || isLoading) && isSuccess && cast.length > 0 ? (
		<VStack width='100%' spacing={spacing}>
			<VerticalGrid>
				{({ displayMode }) =>
					cast
						.filter((_person, index) => index < visibleDebounced)
						.map((person) =>
							displayMode === 'list' ? (
								<PersonHorizontalPoster
									key={person.id}
									person={person}
									subtitle={handleGetSubtitle(person)}
								/>
							) : (
								<PersonVerticalPoster
									key={person.id}
									person={person}
									subtitle={handleGetSubtitle(person)}
								/>
							)
						)
				}
			</VerticalGrid>

			<Center width={isSm ? '100%' : 'auto'}>
				<LoadMore
					amount={visibleDebounced}
					total={cast.length}
					label={
						name
							? `"${name}" ${formatMediaTypeLabel({ type: 'single', mediaType })} Cast Members`
							: `${formatMediaTypeLabel({ type: 'single', mediaType })} Cast Members`
					}
					isLoading={false}
					isButtonVisible={visibleDebounced <= cast.length}
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
							<DummyHorizontalPoster key={index} mediaType='person' hasSubtitle />
						) : (
							<DummyVerticalPoster key={index} mediaType='person' hasSubtitle />
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
							? `"${name}" ${formatMediaTypeLabel({ type: 'single', mediaType })} Cast`
							: `${formatMediaTypeLabel({ type: 'single', mediaType })} Cast`
					}
					isDisabled
					isLoading
					isButtonVisible
				/>
			</Center>
		</VStack>
	);
};

export default ViewCast;
