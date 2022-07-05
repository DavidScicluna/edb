import { ReactElement } from 'react';

import {
	Accordions,
	AccordionsQuickToggles,
	AccordionsPanel,
	Accordion,
	AccordionHeader,
	AccordionBody,
	DummyAccordions,
	DummyQuickToggles,
	DummyAccordionsPanel,
	DummyAccordion,
	DummyAccordionHeader,
	Fade
} from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { isEmpty, isNil, range } from 'lodash';

import { PartialSeason } from '../../../../../../common/types/tv';
import { useSelector } from '../../../../../../common/hooks';
import { handleReturnDate } from '../../../../../../common/utils';
import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';
import { defaultUser, getUser } from '../../../../../../store/slices/Users';

import { SeasonsTabProps } from './types';
import Season from './components/Season';

const SeasonsTab = (props: SeasonsTabProps): ReactElement => {
	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const { show, isError = false, isSuccess = false, isLoading = true } = props;

	return !isLoading && isError ? (
		<Fade in unmountOnExit style={{ width: '100%' }}>
			<Error
				label='Oh no! Something went wrong'
				description={`Failed to fetch ${show?.name ? `"${show.name}"` : 'TV Show'} seasons list!`}
				variant='outlined'
			/>
		</Fade>
	) : !isLoading && isSuccess && show?.seasons && show.seasons.length === 0 ? (
		<Fade in unmountOnExit style={{ width: '100%' }}>
			<Empty
				label={`${show?.name ? `"${show.name}"` : 'TV Show'} seasons list is currently empty!`}
				variant='outlined'
			/>
		</Fade>
	) : !isLoading && isSuccess && show?.seasons && show.seasons.length > 0 ? (
		<Accordions<PartialSeason>
			accordions={show.seasons.map((season, index) => {
				return {
					id: `${season.id || index}`,
					title: season.name || `Season ${season.season_number}`,
					data: { ...season }
				};
			})}
		>
			<AccordionsQuickToggles<PartialSeason> color={color} />

			<AccordionsPanel<PartialSeason>>
				{({ accordions }) =>
					accordions.map(({ id, title, data: season }) => (
						<Accordion
							key={id}
							id={id}
							isDisabled={season.episode_count === 0}
							header={
								<AccordionHeader
									renderTitle={(props) => <Text {...props}>{title}</Text>}
									renderSubtitle={
										!(isNil(season.air_date) || isEmpty(season.air_date))
											? (props) => (
													<Text {...props}>
														{handleReturnDate(season.air_date || '', 'full')}
													</Text>
											  )
											: undefined
									}
									// TODO: Add CountUp Actions
									// total: {
									// 	number: season.episode_count || undefined,
									// 	suffix: season.episode_count ? ' episodes' : 'Confirmed'
									// },
								/>
							}
							body={
								<AccordionBody>
									<Season key={id} id={id} title={title} showId={show?.id} season={season} />
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
		<DummyAccordions accordions={range(5)}>
			<DummyQuickToggles color={color} />

			<DummyAccordionsPanel>
				{({ accordions }) =>
					accordions.map((dummy) => (
						<DummyAccordion key={dummy} p={2}>
							{/* // TODO: Add Dummy CountUp Actions */}
							<DummyAccordionHeader hasSubtitle />
						</DummyAccordion>
					))
				}
			</DummyAccordionsPanel>
		</DummyAccordions>
	);
};

export default SeasonsTab;
