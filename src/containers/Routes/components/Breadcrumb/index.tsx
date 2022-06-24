import { ReactElement } from 'react';

import { FontSize, Skeleton } from '@davidscicluna/component-library';

import { useColorMode, useBreakpointValue, useBoolean, useConst, Text } from '@chakra-ui/react';
import { useQueryClient } from 'react-query';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import range from 'lodash/range';
import sample from 'lodash/sample';
import startCase from 'lodash/startCase';
import { useTimeout } from 'usehooks-ts';

import { BreadcrumbProps, Data } from './types';

const dummies = range(25, 100, 5);

const Breadcrumb = ({ match, mediaType }: BreadcrumbProps): ReactElement => {
	const { colorMode } = useColorMode();
	const breadcrumbFontSize = useBreakpointValue<FontSize>({
		'base': 'sm',
		'sm': 'sm',
		'md': 'md',
		'lg': 'md',
		'xl': 'md',
		'2xl': 'md'
	});

	const [isLoaded, setIsLoaded] = useBoolean();

	const dummy = useConst<number>(sample(dummies) || 50);

	const queryClient = useQueryClient();
	const data: Data | undefined = queryClient.getQueryData([
		`${mediaType === 'tv' || mediaType === 'episode' ? 'tv-show' : mediaType}-${match.params.id}`,
		match.params.id
	]);

	useTimeout(() => setIsLoaded.on(), 2500);

	return (
		<Skeleton
			width={!isLoaded || !data ? `${dummy}%` : 'auto'}
			isLoaded={isLoaded || !(isNil(data) || isEmpty(data))}
			type='text'
		>
			<Text
				align='left'
				color={`gray.${colorMode === 'light' ? 900 : 50}`}
				fontSize={breadcrumbFontSize}
				whiteSpace='nowrap'
			>
				{mediaType === 'episode'
					? match.params.episode
					: data?.title || data?.name || startCase(mediaType === 'tv' ? 'TV-show' : mediaType) || ''}
			</Text>
		</Skeleton>
	);
};

export default Breadcrumb;
