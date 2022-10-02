import { ReactElement } from 'react';

import { useTheme, Skeleton, utils } from '@davidscicluna/component-library';

import { Box, Text } from '@chakra-ui/react';

import { MediaType } from '../../../../../common/types';
import { useUserTheme } from '../../../../../common/hooks';
import { inView as defaultInView } from '../../../common/data/defaultPropValues';
import { getFontSizeHeight } from '../../../../../common/utils';
import { useDummyText } from '../../../common/hooks';

import { VerticalPosterTitleProps } from './types';

const { getColor } = utils;

const VerticalPosterTitle = <MT extends MediaType>(props: VerticalPosterTitleProps<MT>): ReactElement => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { title, inView = defaultInView } = props;

	const dummy = useDummyText();

	return (
		<Box
			width='100%'
			maxWidth='100%'
			height={`${getFontSizeHeight({ theme, fontSize: 'sm', lineHeight: 'normal' })}px`}
		>
			<Skeleton colorMode={colorMode} isLoaded={inView && !!title} variant='text' speed={-1}>
				<Text
					align='left'
					fontSize='sm'
					fontWeight='semibold'
					color={getColor({ theme, colorMode, type: 'text.primary' })}
					lineHeight='normal'
					noOfLines={1}
				>
					{title || dummy || 'Poster Title'}
				</Text>
			</Skeleton>
		</Box>
	);
};

export default VerticalPosterTitle;
