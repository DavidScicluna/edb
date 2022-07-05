import { ReactElement } from 'react';

import { Button } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import range from 'lodash/range';

import { useSelector } from '../../../../../../../../common/hooks';
import { handleReturnImageSize } from '../../../../../../../../common/utils';
import Empty from '../../../../../../../../components/Empty';
import Error from '../../../../../../../../components/Error';
import HorizontalGrid from '../../../../../../../../components/Grid/Horizontal/Default';
import VerticalPoster from '../../../../../../../../components/Poster/Vertical';
import { defaultUser, getUser } from '../../../../../../../../store/slices/Users';

import { GuestsProps } from './types';

const width = ['185px', '205px', '230px'];

const thumbnail = handleReturnImageSize('profile', 'thumbnail');
const full = handleReturnImageSize('profile', 'full');

const Guests = (props: GuestsProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { name, guests, isError = false, isSuccess = false, isLoading = true, onChangeTab } = props;

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	return (
		<HorizontalGrid
			title='Guests Stars'
			footer={
				<Button
					color={color}
					isFullWidth
					isDisabled={isLoading}
					onClick={() => onChangeTab()}
					size={isSm ? 'sm' : 'md'}
					variant='text'
				>
					{`View all ${guests?.length || 0} guests star${
						guests && (guests.length === 0 || guests.length > 1 ? 's' : '')
					}`}
				</Button>
			}
			isDisabled={isLoading || guests?.length === 0}
			variant='outlined'
		>
			{!isLoading && isError ? (
				<Error
					label='Oh no! Something went wrong'
					description={`Failed to fetch ${name ? `"${name}"` : ''} guest stars list!`}
					variant='transparent'
				/>
			) : !isLoading && isSuccess && guests && guests.length === 0 ? (
				<Empty
					label={`${name ? `"${name}" guest` : 'Guest'} stars list is currently empty!`}
					variant='transparent'
				/>
			) : !isLoading && isSuccess && guests && guests.length > 0 ? (
				guests
					.filter((_person, index) => index < 5)
					.map((person) => (
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
				range(0, 5).map((_dummy, index: number) => (
					<VerticalPoster key={index} width={width} mediaType='person' title='Guest Star Name' isLoading />
				))
			)}
		</HorizontalGrid>
	);
};

export default Guests;
