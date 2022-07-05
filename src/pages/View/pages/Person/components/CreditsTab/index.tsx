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
	DummyAccordionHeader
} from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import range from 'lodash/range';

import { useSelector } from '../../../../../../common/hooks';
import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';
import { defaultUser, getUser } from '../../../../../../store/slices/Users';
import { Department } from '../../types';

import { CreditsTabProps } from './types';
import MediaItems from './components/MediaItems';

const CreditsTab = (props: CreditsTabProps): ReactElement => {
	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const { departments = [], name, isLoading = true, isError = false, isSuccess = false } = props;

	return !isLoading && isError ? (
		<Error
			label='Oh no! Something went wrong'
			description={`Failed to fetch ${name ? `"${name}"` : ''} credits list!`}
			variant='outlined'
		/>
	) : !isLoading && isSuccess && departments.length === 0 ? (
		<Empty label={`${name ? `"${name}" credits` : 'Credits'} list is currently empty!`} variant='outlined' />
	) : !isLoading && isSuccess && departments.length > 0 ? (
		<Accordions<Department>
			accordions={departments.map((department) => {
				return {
					id: department.id,
					title: department.label,
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
							isDisabled={
								(department.credits.cast?.movie?.length || 0) +
									(department.credits.cast?.tv?.length || 0) +
									(department.credits.crew?.movie?.length || 0) +
									(department.credits.crew?.tv?.length || 0) ===
								0
							}
							header={
								<AccordionHeader
									renderTitle={(props) => <Text {...props}>{title}</Text>}
									// TODO: Add CountUp Actions
									// total: {
									// 	number:
									// 		(department.credits.cast?.movie?.length || 0) +
									// 		(department.credits.cast?.tv?.length || 0) +
									// 		(department.credits.crew?.movie?.length || 0) +
									// 		(department.credits.crew?.tv?.length || 0)
									// },
								/>
							}
							body={
								<AccordionBody>
									<MediaItems
										movies={[
											...(department.credits?.cast?.movie || []),
											...(department.credits?.crew?.movie || [])
										]}
										shows={[
											...(department.credits?.cast?.tv || []),
											...(department.credits?.crew?.tv || [])
										]}
										label={title}
										job={
											(department.credits?.cast?.movie?.length || 0) +
												(department.credits?.cast?.tv?.length || 0) >
											(department.credits?.crew?.movie?.length || 0) +
												(department.credits?.crew?.tv?.length || 0)
												? 'cast'
												: 'crew'
										}
									/>
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
		<DummyAccordions accordions={range(10)}>
			<DummyQuickToggles color={color} />

			<DummyAccordionsPanel>
				{({ accordions }) =>
					accordions.map((dummy) => (
						<DummyAccordion key={dummy} p={2}>
							{/* // TODO: Add Dummy CountUp Actions */}
							<DummyAccordionHeader />
						</DummyAccordion>
					))
				}
			</DummyAccordionsPanel>
		</DummyAccordions>
	);
};

export default CreditsTab;
