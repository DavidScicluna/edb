import { ReactElement, useState } from 'react';

import { useTheme, useDebounce, Button, Icon, utils } from '@davidscicluna/component-library';

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

import { ViewCastMediaType, ViewCastProps } from './types';

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
			<VerticalGrid spacing={spacing}>
				{({ displayMode }) =>
					cast
						.filter((_person, index) => index < visibleDebounced)
						.map((person) =>
							displayMode === 'list' ? (
								<PersonHorizontalPoster
									key={person.id}
									person={person}
									subtitle={person.character ? `As ${person.character}` : undefined}
								/>
							) : (
								<PersonVerticalPoster
									key={person.id}
									person={person}
									subtitle={person.character ? `As ${person.character}` : undefined}
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
			<VerticalGrid spacing={spacing}>
				{({ displayMode }) =>
					range(20).map((_dummy, index) =>
						displayMode === 'list' ? (
							<DummyHorizontalPoster key={index} mediaType='person' hasSubtitle hasDescription />
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
