import { ReactElement } from 'react';

import { useMediaQuery, VStack } from '@chakra-ui/react';

import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';

import Subtitle from './components/Subtitle';
import Title from './components/Title';
import { LastEpisodeProps } from './types';

import { useSelector } from '../../../../../../../../common/hooks';
import { handleReturnDate } from '../../../../../../../../common/utils';
import Button from '../../../../../../../../components/Clickable/Button';
import Panel from '../../../../../../../../components/Panel';
import { defaultUser, getUser } from '../../../../../../../../store/slices/Users';
import Episode from '../../../SeasonsTab/components/Season/components/Episodes/components/Episode';

const LastEpisode = ({ show, isLoading = true, onChangeTab }: LastEpisodeProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	return (
		<Panel isFullWidth>
			{{
				header: {
					title: (
						<VStack width='100%' alignItems='flex-start' spacing={isLoading ? 0.5 : 0}>
							<Title
								title={`Latest ${show?.name ? `"${show.name}"` : 'TV Show'} episode`}
								isLoading={isLoading}
							/>
							{!(
								isNil(show?.last_episode_to_air?.air_date) ||
								isEmpty(show?.last_episode_to_air?.air_date)
							) || isLoading ? (
								<Subtitle
									subtitle={`Episode Aired on ${handleReturnDate(
										show?.last_episode_to_air?.air_date || '',
										'full'
									)}`}
									isLoading={isLoading}
								/> // TODO: Check Date is empty with lodash
							) : null}
						</VStack>
					)
				},
				body: <Episode showId={show?.id} episode={show?.last_episode_to_air} isLoading={isLoading} />,
				footer: (
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
				)
			}}
		</Panel>
	);
};

export default LastEpisode;
