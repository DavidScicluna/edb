import { ReactElement } from 'react';

import { Button } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';
import qs from 'query-string';

import { useSelector } from '../../../../../../../common/hooks';
import Link from '../../../../../../../components/Clickable/Link';
import HorizontalGrid from '../../../../../../../components/Grid/Horizontal/Default';
import { defaultUser, getUser } from '../../../../../../../store/slices/Users';
import VerticalCompanyPoster from '../components/Poster/Vertical';

import { CompaniesProps } from './types';

const Companies = ({ query, companies = [], total = 0 }: CompaniesProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	return (
		<HorizontalGrid
			title={`Found ${total} ${total === 0 || total > 1 ? 'companies' : 'company'} with "${query}"`}
			footer={
				total > 20 ? (
					<Link to={{ pathname: '/search', search: qs.stringify({ query }), hash: 'company' }} isFullWidth>
						<Button color={color} isFullWidth size={isSm ? 'sm' : 'md'} variant='text'>
							{`View all ${total} ${total === 0 || total > 1 ? 'companies' : 'company'} with "${query}"`}
						</Button>
					</Link>
				) : undefined
			}
		>
			{companies.map((company) => (
				<VerticalCompanyPoster
					key={company.id}
					width={['185px', '205px', '230px']}
					company={company}
					isLoading={false}
				/>
			))}
		</HorizontalGrid>
	);
};

export default Companies;
