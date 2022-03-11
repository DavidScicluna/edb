import { ReactElement } from 'react';

import { Fade } from '@chakra-ui/react';

import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import range from 'lodash/range';

import Season from './components/Season';
import { SeasonsTabProps } from './types';

import { useSelector } from '../../../../../../common/hooks';
import { handleReturnDate } from '../../../../../../common/utils';
import Accordions from '../../../../../../components/Accordions';
import Empty from '../../../../../../components/Empty';
import Error from '../../../../../../components/Error';
import { defaultUser, getUser } from '../../../../../../store/slices/Users';

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
	) : (
		<Accordions
			accordions={
				!isLoading && isSuccess && show?.seasons && show.seasons.length > 0
					? show.seasons.map((season, index) => {
							return {
								id: `${season.id || index}`,
								title: season.name || `Season ${season.season_number}`,
								subtitle: !(isNil(season.air_date) || isEmpty(season.air_date))
									? handleReturnDate(season.air_date, 'full')
									: undefined,
								total: {
									number: season.episode_count || undefined,
									suffix: season.episode_count ? ' episodes' : 'Confirmed'
								},
								isDisabled: season.episode_count === 0,
								data: { ...season }
							};
					  })
					: range(0, 5).map((_dummy, index: number) => {
							return {
								id: `${index}`,
								title: `Season ${index + 1}`,
								subtitle: 'Season Date',
								isDisabled: true
							};
					  })
			}
			renderAccordion={({ id, title, isOpen, data }) => (
				<Season key={id} id={id} title={title} showId={show?.id} season={data} isOpen={isOpen} />
			)}
			color={color}
			isLoading={isLoading}
			isError={isError}
		/>
	);
};

export default SeasonsTab;
