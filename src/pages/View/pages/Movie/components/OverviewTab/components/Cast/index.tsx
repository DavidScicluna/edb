import { ReactElement } from 'react';

import { Button } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import range from 'lodash/range';

import { useSelector } from '../../../../../../../../common/hooks';
import { Cast as CastType } from '../../../../../../../../common/types/movie';
import { handleReturnImageSize } from '../../../../../../../../common/utils';
import Empty from '../../../../../../../../components/Empty';
import Error from '../../../../../../../../components/Error';
import HorizontalGrid from '../../../../../../../../components/Grid/Horizontal/Default';
import VerticalPoster from '../../../../../../../../components/Poster/Vertical';
import { defaultUser, getUser } from '../../../../../../../../store/slices/Users';

import { CastProps } from './types';

const width = ['185px', '205px', '230px'];

const thumbnail = handleReturnImageSize('profile', 'thumbnail');
const full = handleReturnImageSize('profile', 'full');

const Cast = (props: CastProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { title, cast, isError = false, isSuccess = false, isLoading = true, onChangeTab } = props;

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	return (
		<HorizontalGrid
			title='Cast'
			footer={
				<Button
					color={color}
					isFullWidth
					isDisabled={isLoading}
					onClick={() => onChangeTab()}
					size={isSm ? 'sm' : 'md'}
					variant='text'
				>
					{`View all ${cast?.length || 0} cast member${
						cast && (cast.length === 0 || cast.length > 1 ? 's' : '')
					}`}
				</Button>
			}
			isDisabled={isLoading || cast?.length === 0}
			variant='outlined'
		>
			{!isLoading && isError ? (
				<Error
					label='Oh no! Something went wrong'
					description={`Failed to fetch ${title ? `"${title}"` : ''} cast list!`}
					variant='transparent'
				/>
			) : !isLoading && isSuccess && cast && cast.length === 0 ? (
				<Empty label={`${title ? `"${title}"` : ''} cast list is currently empty!`} variant='transparent' />
			) : !isLoading && isSuccess && cast && cast.length > 0 ? (
				cast
					.filter((_person, index) => index < 10)
					.map((person: CastType) => (
						<VerticalPoster
							key={person.id}
							width={width}
							mediaItem={person ? { ...person } : undefined}
							mediaType='person'
							image={{
								alt: `${person?.name || ''} person poster`,
								src: person?.profile_path || '',
								size: { thumbnail, full }
							}}
							title={person?.name || ''}
							subtitle={person.character ? `As ${person.character}` : ''}
							isLoading={isLoading}
						/>
					))
			) : (
				range(0, 20).map((_dummy, index: number) => (
					<VerticalPoster key={index} width={width} mediaType='person' title='Cast Member Name' isLoading />
				))
			)}
		</HorizontalGrid>
	);
};

export default Cast;
