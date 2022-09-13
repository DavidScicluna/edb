import { ReactElement } from 'react';

import { useTheme, Skeleton, utils } from '@davidscicluna/component-library';

import { Box, Text } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { MediaType } from '../../../../../common/types';
import { useUserTheme } from '../../../../../common/hooks';
import { inView as defaultInView } from '../../../common/data/defaultPropValues';

import { VerticalPosterTitleProps } from './types';

const { getColor } = utils;

const VerticalPosterTitle = <MT extends MediaType>(props: VerticalPosterTitleProps<MT>): ReactElement => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [titleRef, { height: titleHeight }] = useElementSize();

	const { title, inView = defaultInView } = props;

	return (
		<Box ref={titleRef} width='100%' maxWidth='100%' height={`${titleHeight}px`}>
			<Skeleton isLoaded={inView} variant='text'>
				<Text
					align='left'
					fontSize='sm'
					fontWeight='semibold'
					color={getColor({ theme, colorMode, type: 'text.primary' })}
					noOfLines={1}
				>
					{title || 'Poster Title'}
				</Text>
			</Skeleton>
		</Box>
	);
};

export default VerticalPosterTitle;
