import React, { ReactElement } from 'react';
import { useQueryClient } from 'react-query';

import { Center } from '@chakra-ui/react';

import _ from 'lodash';

import { BreadcrumbProps, Data } from './types';

const Breadcrumb = ({ match, mediaType }: BreadcrumbProps): ReactElement => {
	const queryClient = useQueryClient();

	const data: Data | undefined = queryClient.getQueryData([
		`${mediaType === 'tv' ? 'tv-show' : mediaType}-${match.params.id}`,
		match.params.id
	]);

	return (
		<Center>{data?.title || data?.name || _.startCase(mediaType === 'tv' ? 'tv-show' : mediaType) || ''}</Center>
	);
};

export default Breadcrumb;
