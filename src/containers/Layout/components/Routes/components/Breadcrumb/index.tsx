import { ReactElement } from 'react';
import { useQueryClient } from 'react-query';

import { Center } from '@chakra-ui/react';

import { startCase } from 'lodash';

import { BreadcrumbProps, Data } from './types';

const Breadcrumb = ({ match, mediaType }: BreadcrumbProps): ReactElement => {
	const queryClient = useQueryClient();

	const data: Data | undefined = queryClient.getQueryData([
		`${mediaType === 'tv' || mediaType === 'episode' ? 'tv-show' : mediaType}-${match.params.id}`,
		match.params.id
	]);

	return (
		<Center>
			{mediaType === 'episode'
				? match.params.episode
				: data?.title || data?.name || startCase(mediaType === 'tv' ? 'TV-show' : mediaType) || ''}
		</Center>
	);
};

export default Breadcrumb;
