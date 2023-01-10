import { ReactElement } from 'react';

import {
	useTheme,
	Accordions,
	AccordionsQuickToggles,
	AccordionsPanel,
	Accordion,
	AccordionHeader,
	AccordionBody,
	DummyAccordions,
	DummyAccordionsPanel,
	DummyAccordion,
	DummyAccordionHeader,
	Button,
	Icon,
	utils
} from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { compact, range } from 'lodash';

import { useUserTheme } from '../../../../../common/hooks';
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
	PersonHorizontalPoster,
	PersonVerticalPoster
} from '../../../../../components';
import { formatMediaTypeLabel } from '../../../../../common/utils';
import { getEmptySubtitle } from '../../../../../components/QueryEmpty/common/utils';

import { ViewCrewMediaType, ViewCrewProps, ViewCrewGetDepartmentType } from './types';

const { getColor } = utils;

const ViewCrew = <MT extends ViewCrewMediaType>(props: ViewCrewProps<MT>): ReactElement => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const {
		mediaType,
		departments = [],
		name,
		isFetching = false,
		isLoading = false,
		isError = false,
		isSuccess = false,
		refetch
	} = props;

	const handleGetSubtitle = (person: ViewCrewGetDepartmentType<MT>): string => {
		switch (mediaType) {
			case 'tv': {
				const { jobs = [] } = person as ViewCrewGetDepartmentType<'tv'>;
				return jobs.length > 0
					? compact(
							jobs.map(({ episode_count = 0, job }) =>
								episode_count > 0
									? `${job} (${episode_count} episode${episode_count === 1 ? '' : 's'})`
									: job
							)
					  ).join(', ')
					: ' ';
			}
			default:
				return ' ';
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
								? `"${name}" ${formatMediaTypeLabel({ type: 'single', mediaType })} Crew Members`
								: `${formatMediaTypeLabel({ type: 'single', mediaType })} Crew Members`
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
	) : !(isFetching || isLoading) && isSuccess && departments.length === 0 ? (
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
								? `"${name}" ${formatMediaTypeLabel({ type: 'single', mediaType })} Crew Members`
								: `${formatMediaTypeLabel({ type: 'single', mediaType })} Crew Members`
						})}
					</QueryEmptySubtitle>
				</QueryEmptyBody>
			</QueryEmptyStack>
		</QueryEmpty>
	) : !(isFetching || isLoading) && isSuccess && departments.length > 0 ? (
		<Accordions<ViewCrewGetDepartmentType<MT>[]>
			color='gray'
			colorMode={colorMode}
			accordions={departments}
			spacing={2}
		>
			<AccordionsQuickToggles<ViewCrewGetDepartmentType<MT>[]> color={color} size='xs' spacing={1} />
			<AccordionsPanel<ViewCrewGetDepartmentType<MT>[]>>
				{({ accordions, opened = [] }) =>
					accordions.map(({ id, title, data: department }) => (
						<Accordion
							key={id}
							id={id}
							isDisabled={department.length === 0}
							header={
								<AccordionHeader
									renderTitle={(props) => <Text {...props}>{title}</Text>}
									actions={
										<TotalBadge
											color={opened.includes(id) ? color : 'gray'}
											colorMode={colorMode}
											total={department.length}
											variant={opened.includes(id) ? 'contained' : 'outlined'}
										/>
									}
									spacing={1}
								/>
							}
							body={
								<AccordionBody>
									<VerticalGrid spacing={2}>
										{({ displayMode }) =>
											department.map((person) =>
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
								</AccordionBody>
							}
							spacing={2}
							p={2}
						/>
					))
				}
			</AccordionsPanel>
		</Accordions>
	) : (
		<DummyAccordions color='gray' colorMode={colorMode} accordions={range(8)} spacing={2}>
			<DummyAccordionsPanel>
				{({ accordions }) =>
					accordions.map((dummy) => (
						<DummyAccordion key={dummy} p={2}>
							<DummyAccordionHeader />
						</DummyAccordion>
					))
				}
			</DummyAccordionsPanel>
		</DummyAccordions>
	);
};

export default ViewCrew;
