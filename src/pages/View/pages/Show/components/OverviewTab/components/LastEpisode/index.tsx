import { ReactElement } from 'react';

import { Card, CardHeader, CardBody, CardFooter, Button } from '@davidscicluna/component-library';

import { useMediaQuery, Text } from '@chakra-ui/react';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { useSelector } from '../../../../../../../../common/hooks';
import { handleReturnDate } from '../../../../../../../../common/utils';
import { defaultUser, getUser } from '../../../../../../../../store/slices/Users';
import Episode from '../../../SeasonsTab/components/Season/components/Episodes/components/Episode';

import { LastEpisodeProps } from './types';

const LastEpisode = ({ show, isLoading = true, onChangeTab }: LastEpisodeProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	return (
		// TODO: Fix Title/Subtitle loading
		<Card isFullWidth>
			<CardHeader
				renderTitle={(props) => (
					<Text {...props}>{`Latest ${show?.name ? `"${show.name}"` : 'TV Show'} episode`}</Text>
				)}
				// TODO: Check Date is empty with lodash
				renderSubtitle={
					!(isNil(show?.last_episode_to_air?.air_date) || isEmpty(show?.last_episode_to_air?.air_date)) ||
					isLoading
						? (props) => (
								<Text {...props}>{`Episode Aired on ${handleReturnDate(
									show?.last_episode_to_air?.air_date || '',
									'full'
								)}`}</Text>
						  )
						: undefined
				}
			/>
			<CardBody>
				<Episode showId={show?.id} episode={show?.last_episode_to_air} isLoading={isLoading} />
			</CardBody>
			<CardFooter>
				<Button
					color={color}
					isFullWidth
					isDisabled={isLoading}
					onClick={() => onChangeTab()}
					size={isSm ? 'sm' : 'md'}
					variant='text'
				>
					{`View all ${show?.name ? `"${show.name}"` : 'TV Show'} episode${
						(show?.number_of_episodes || 0) === 0 || (show?.number_of_episodes || 0) > 1 ? 's' : ''
					}`}
				</Button>
			</CardFooter>
		</Card>
	);
};

export default LastEpisode;
