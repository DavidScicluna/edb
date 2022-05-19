import { ReactElement, useState } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';

import capitalize from 'lodash/capitalize';
import range from 'lodash/range';


import { useSelector } from '../../../../../../common/hooks';
import { handleReturnImageSize } from '../../../../../../common/utils';
import LoadMore from '../../../../../../components/Clickable/LoadMore';
import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';
import VerticalGrid from '../../../../../../components/Grid/Vertical';
import VerticalPoster from '../../../../../../components/Poster/Vertical';
import { defaultUser, getUser } from '../../../../../../store/slices/Users';
import { handleReturnPersonJobLabel } from '../../common/utils';

import { CrewProps } from './types';

const incrementBy = 15;

const thumbnail = handleReturnImageSize('profile', 'thumbnail');
const full = handleReturnImageSize('profile', 'full');

const Crew = (props: CrewProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const { title, crew = [], isLoading = true, isError = false, isSuccess = false } = props;

	const [totalVisible, setTotalVisible] = useState<number>(incrementBy);

	return (
		<VStack width='100%' spacing={2}>
			{!isLoading && isError ? (
				<Error
					label='Oh no! Something went wrong'
					description={`Failed to fetch ${title} crew list!`}
					variant='outlined'
				/>
			) : !isLoading && isSuccess && crew && crew.length === 0 ? (
				<Empty label={`${capitalize(title)} crew list is currently empty!`} variant='outlined' />
			) : !isLoading && isSuccess && crew && crew.length > 0 ? (
				<VStack width='100%' spacing={4}>
					<VerticalGrid displayMode='grid'>
						{() =>
							crew
								.filter((_person, index) => index < totalVisible)
								.map((person) => (
									<VerticalPoster
										key={person.id}
										width='100%'
										mediaItem={person ? { ...person } : undefined}
										mediaType='person'
										image={{
											alt: `${person?.name || ''} person poster`,
											src: person?.profile_path || '',
											size: { thumbnail, full }
										}}
										title={person?.name || ''}
										subtitle={
											person.job
												? person.job
												: person.jobs && person.jobs.length > 0
												? handleReturnPersonJobLabel(person.jobs || [])
												: ''
										}
										isLoading={false}
									/>
								))
						}
					</VerticalGrid>

					<ScaleFade
						in={(crew?.length || 0) > 0 && (crew?.length || 0) > incrementBy}
						unmountOnExit
						style={{ width: isSm ? '100%' : 'auto' }}
					>
						<LoadMore
							color={color}
							amount={totalVisible}
							total={crew?.length || 0}
							label={`${title} Crew`}
							onClick={() => setTotalVisible(totalVisible + incrementBy)}
						/>
					</ScaleFade>
				</VStack>
			) : (
				<VerticalGrid displayMode='grid'>
					{() =>
						range(0, incrementBy).map((_dummy, index: number) => (
							<VerticalPoster
								key={index}
								width='100%'
								mediaType='person'
								title='Crew Member Name'
								isLoading
							/>
						))
					}
				</VerticalGrid>
			)}
		</VStack>
	);
};

export default Crew;
