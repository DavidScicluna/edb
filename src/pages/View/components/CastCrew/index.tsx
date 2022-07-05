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

import { useConst, Text } from '@chakra-ui/react';

import range from 'lodash/range';

import { useSelector } from '../../../../common/hooks';
import Empty from '../../../../components/Empty';
import Error from '../../../../components/Error';
import { defaultUser, getUser } from '../../../../store/slices/Users';

import { Department, CastCrewProps } from './types';
import Crew from './components/Crew';
import Cast from './components/Cast';
import { handleReturnCrew } from './common/utils';

const CastCrew = (props: CastCrewProps): ReactElement => {
	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const { alt, credits, isError = false, isSuccess = false, isLoading = true } = props;

	const departments = useConst<Department[]>(handleReturnCrew(credits));

	return !isLoading && isError ? (
		<Fade in unmountOnExit style={{ width: '100%' }}>
			<Error
				label='Oh no! Something went wrong'
				description={`Failed to fetch ${alt ? `"${alt}"` : ''} cast & crew list!`}
				variant='outlined'
			/>
		</Fade>
	) : !isLoading && isSuccess && departments && departments.length === 0 ? (
		<Fade in unmountOnExit style={{ width: '100%' }}>
			<Empty
				label={`${alt ? `"${alt}" cast & crew` : 'Cast & Crew'} list is currently empty!`}
				variant='outlined'
			/>
		</Fade>
	) : !isLoading && isSuccess && departments && departments.length > 0 ? (
		<Accordions<Department>
			accordions={departments.map((department) => {
				return {
					id: department.id,
					title: department.title,
					data: { ...department }
				};
			})}
		>
			<AccordionsQuickToggles<Department> color={color} />

			<AccordionsPanel<Department>>
				{({ accordions }) =>
					accordions.map(({ id, title, data: department }) => (
						<Accordion
							key={id}
							id={id}
							isDisabled={department.people.length === 0}
							header={
								<AccordionHeader
									renderTitle={(props) => <Text {...props}>{title}</Text>}
									// TODO: Add CountUp Actions
									// total: {
									// 	number: department.people.length
									// },
								/>
							}
							body={
								<AccordionBody>
									{id === 'cast' || id === 'guest_stars' ? (
										<Cast
											key={id}
											cast={department.people}
											isLoading={isLoading}
											isError={isError}
											isSuccess={isSuccess}
										/>
									) : (
										<Crew
											key={id}
											title={title}
											crew={department.people}
											isLoading={isLoading}
											isError={isError}
											isSuccess={isSuccess}
										/>
									)}
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

export default CastCrew;
