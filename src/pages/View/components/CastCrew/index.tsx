import { ReactElement } from 'react';

import { useConst, Fade } from '@chakra-ui/react';

import { range } from 'lodash';

import { handleReturnCrew } from './common/utils';
import Cast from './components/Cast';
import Crew from './components/Crew';
import { Department, CastCrewProps } from './types';

import { useSelector } from '../../../../common/hooks';
import Accordions from '../../../../components/Accordions';
import Empty from '../../../../components/Empty';
import Error from '../../../../components/Error';
import { defaultUser, getUser } from '../../../../store/slices/Users';

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
	) : (
		<Accordions
			accordions={
				!isLoading && isSuccess && departments && departments.length > 0
					? departments.map((department) => {
							return {
								id: department.id,
								title: department.title,
								total: {
									number: department.people.length
								},
								isDisabled: department.people.length === 0,
								data: department.people
							};
					  })
					: range(0, 5).map((_dummy, index: number) => {
							return {
								id: `${index}`,
								title: `Department ${index + 1}`,
								isDisabled: true
							};
					  })
			}
			renderAccordion={({ id, title, data }) =>
				id === 'cast' || id === 'guest_stars' ? (
					<Cast key={id} cast={data} isLoading={isLoading} isError={isError} isSuccess={isSuccess} />
				) : (
					<Crew
						key={id}
						title={title}
						crew={data}
						isLoading={isLoading}
						isError={isError}
						isSuccess={isSuccess}
					/>
				)
			}
			color={color}
			isLoading={isLoading}
			isError={isError}
		/>
	);
};

export default CastCrew;
