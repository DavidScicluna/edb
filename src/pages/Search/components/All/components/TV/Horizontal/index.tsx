import { ReactElement } from 'react';

import { Button } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';
import qs from 'query-string';


import { useSelector } from '../../../../../../../common/hooks';
import { PartialTV } from '../../../../../../../common/types/tv';
import Link from '../../../../../../../components/Clickable/Link';
import HorizontalGrid from '../../../../../../../components/Grid/Horizontal/Default';
import { defaultUser, getUser } from '../../../../../../../store/slices/Users';
import VerticalTVShowPoster from '../../../../../../TV/components/Poster/Vertical';

import { HorizontalSearchTVProps } from './types';

const HorizontalSearchTV = ({ query, shows = [], total = 0 }: HorizontalSearchTVProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	return (
		<HorizontalGrid
			title={`Found ${total} TV show${total === 0 || total > 1 ? 's' : ''} with "${query}"`}
			footer={
				total > 20 ? (
					<Link to={{ pathname: '/search', search: qs.stringify({ query }), hash: 'tv' }} isFullWidth>
						<Button color={color} isFullWidth size={isSm ? 'sm' : 'md'} variant='text'>
							{`View all ${total} TV show${total === 0 || total > 1 ? 's' : ''} with "${query}"`}
						</Button>
					</Link>
				) : undefined
			}
		>
			{shows.map((show: PartialTV) => (
				<VerticalTVShowPoster key={show.id} width={['185px', '205px', '230px']} show={show} isLoading={false} />
			))}
		</HorizontalGrid>
	);
};

export default HorizontalSearchTV;
