import { FC } from 'react';

import {
	useTheme,
	Headline,
	Accordions,
	AccordionsQuickToggles,
	AccordionsPanel,
	DummyAccordions,
	DummyAccordionsPanel,
	DummyAccordion,
	DummyAccordionHeader,
	Button,
	Divider,
	Icon,
	utils
} from '@davidscicluna/component-library';

import { VStack, Center, Text } from '@chakra-ui/react';

import { range } from 'lodash';

import { useUserTheme } from '../../../../../../../common/hooks';
import {
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyIcon,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle,
	QueryEmptyActions,
	TotalBadge
} from '../../../../../../../components';
import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';
import { useTVShowContext } from '../../common/hooks';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';
import { getEmptySubtitle } from '../../../../../../../components/QueryEmpty/common/utils';
import { PartialSeason } from '../../../../../../../common/types/tv';

import SeasonsTabAccordion from './components/SeasonsTabAccordion';

const { getColor } = utils;

const SeasonsTab: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const { showQuery } = useTVShowContext();

	const { data: show, isFetching, isLoading, isError, isSuccess, refetch } = showQuery || {};
	const { name, seasons = [] } = show || {};

	return (
		// TODO: Maybe create a ViewTabStructure component and place headline in it with VStack
		<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={2}>
			<Headline
				width='100%'
				renderCaption={() => (
					<TotalBadge
						color={color}
						colorMode={colorMode}
						prefix={`${
							name ? name : formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })
						} has a total of`}
						suffix={`Season${seasons.length === 1 ? '' : 's'}`}
						total={seasons.length || 0}
					/>
				)}
				renderTitle={(props) => <Text {...props}>Seasons</Text>}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`This Tab contains all the seasons that were released for ${
							name ? name : `the ${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })}`
						}`}
					</Text>
				)}
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
											? `"${name}" ${formatMediaTypeLabel({
													type: 'single',
													mediaType: 'tv'
											  })} Seasons`
											: `${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })} Seasons`
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
				) : !(isFetching || isLoading) && isSuccess && seasons.length === 0 ? (
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
											? `"${name}" ${formatMediaTypeLabel({
													type: 'single',
													mediaType: 'tv'
											  })} Seasons`
											: `${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })} Seasons`
									})}
								</QueryEmptySubtitle>
							</QueryEmptyBody>
						</QueryEmptyStack>
					</QueryEmpty>
				) : !(isFetching || isLoading) && isSuccess && seasons.length > 0 ? (
					<Accordions<PartialSeason>
						color='gray'
						colorMode={colorMode}
						accordions={seasons.map((season, index) => {
							return {
								id: String(season.id || index),
								title: season.name || `Season ${index + 1}`,
								data: { ...season }
							};
						})}
						spacing={2}
					>
						<AccordionsQuickToggles<PartialSeason> color={color} size='xs' spacing={1} />
						<AccordionsPanel<PartialSeason>>
							{({ accordions, opened = [] }) =>
								accordions.map(({ id, title, data: season }) => (
									<SeasonsTabAccordion
										key={id}
										id={id}
										title={title}
										season={season}
										isOpen={opened.some((accordion: unknown) => accordion === id)}
									/>
								))
							}
						</AccordionsPanel>
					</Accordions>
				) : (
					<DummyAccordions color='gray' colorMode={colorMode} accordions={range(5)} spacing={2}>
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
				)}
			</Center>
		</VStack>
	);
};

export default SeasonsTab;
