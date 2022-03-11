import { ReactElement } from 'react';
import { useQueryClient } from 'react-query';

import { useColorMode, useBreakpointValue, useBoolean, useConst, Text } from '@chakra-ui/react';

import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import range from 'lodash/range';
import sample from 'lodash/sample';
import startCase from 'lodash/startCase';
import { useTimeout } from 'usehooks-ts';

import { BreadcrumbProps, Data } from './types';

import SkeletonText from '../../../../../../components/Skeleton/Text';
import { FontSizes } from '../../../../../../theme/types';

const dummies = range(25, 100, 5);

const Breadcrumb = ({ match, mediaType }: BreadcrumbProps): ReactElement => {
	const { colorMode } = useColorMode();
	const breadcrumbFontSize = useBreakpointValue<keyof FontSizes>({
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
		<SkeletonText
			width={!isLoaded || !data ? `${dummy}%` : 'auto'}
			fontSize={breadcrumbFontSize}
			isLoaded={isLoaded || !(isNil(data) || isEmpty(data))}
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
		</SkeletonText>
	);
};

export default Breadcrumb;
