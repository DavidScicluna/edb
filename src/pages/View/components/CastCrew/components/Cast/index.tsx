import { ReactElement, useState } from 'react';

import { useMediaQuery, VStack, ScaleFade } from '@chakra-ui/react';

import range from 'lodash/range';

import { useSelector } from '../../../../../../common/hooks';
import { handleReturnImageSize } from '../../../../../../common/utils';
import LoadMore from '../../../../../../components/Clickable/LoadMore';
import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';
import VerticalGrid from '../../../../../../components/Grid/Vertical';
import VerticalPoster from '../../../../../../components/Poster/Vertical';
import { defaultUser, getUser } from '../../../../../../store/slices/Users';
import { handleReturnPersonRoleLabel } from '../../common/utils';

import { CastProps } from './types';

const incrementBy = 15;

const thumbnail = handleReturnImageSize('profile', 'thumbnail');
const full = handleReturnImageSize('profile', 'full');

const Cast = (props: CastProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const { cast = [], isLoading = true, isError = false, isSuccess = false } = props;

	const [totalVisible, setTotalVisible] = useState<number>(incrementBy);

	return (
		<VStack width='100%' spacing={2}>
			{!isLoading && isError ? (
				<Error
					label='Oh no! Something went wrong'
					description={`Failed to fetch cast list!`}
					variant='outlined'
				/>
			) : !isLoading && isSuccess && cast && cast.length === 0 ? (
				<Empty label={`Cast list is currently empty!`} variant='outlined' />
			) : !isLoading && isSuccess && cast && cast.length > 0 ? (
				<VStack width='100%' spacing={4}>
					<VerticalGrid displayMode='grid'>
						{() =>
							cast
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
											person?.character
												? `As ${person.character}`
												: person.roles && person.roles.length > 0
												? handleReturnPersonRoleLabel(person.roles)
												: ''
										}
										isLoading={isLoading}
									/>
								))
						}
					</VerticalGrid>

					<ScaleFade
						in={(cast?.length || 0) > 0 && (cast?.length || 0) > incrementBy}
						unmountOnExit
						style={{ width: isSm ? '100%' : 'auto' }}
					>
						<LoadMore
							color={color}
							amount={totalVisible}
							total={cast?.length || 0}
							label='Cast'
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
								title='Cast Member Name'
								isLoading
							/>
						))
					}
				</VerticalGrid>
			)}
		</VStack>
	);
};

export default Cast;
