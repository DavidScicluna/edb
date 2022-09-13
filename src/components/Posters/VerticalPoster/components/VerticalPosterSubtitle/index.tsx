import { ReactElement } from 'react';

import { useTheme, Skeleton, utils } from '@davidscicluna/component-library';

import { Box, Text } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { MediaType } from '../../../../../common/types';
import { useUserTheme } from '../../../../../common/hooks';
import { inView as defaultInView } from '../../../common/data/defaultPropValues';

import { VerticalPosterSubtitleProps } from './types';

const { getColor } = utils;

const VerticalPosterSubtitle = <MT extends MediaType>(props: VerticalPosterSubtitleProps<MT>): ReactElement => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [subtitleRef, { height: subtitleHeight }] = useElementSize();

	const { subtitle, inView = defaultInView } = props;

	return (
		<Box ref={subtitleRef} width='100%' maxWidth='100%' height={`${subtitleHeight}px`}>
			<Skeleton isLoaded={inView} variant='text'>
				<Text
					align='left'
					fontSize='xs'
					fontWeight='normal'
					color={getColor({ theme, colorMode, type: 'text.secondary' })}
					noOfLines={1}
				>
					{subtitle || 'Poster Subtitle'}
				</Text>
			</Skeleton>
		</Box>
	);
};

export default VerticalPosterSubtitle;
