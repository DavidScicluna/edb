import { ReactElement } from 'react';

import { useTheme, Skeleton, utils } from '@davidscicluna/component-library';

import { Box, Text } from '@chakra-ui/react';

import { MediaType } from '../../../../../common/types';
import { useUserTheme } from '../../../../../common/hooks';
import { getFontSizeHeight } from '../../../../../common/utils';
import { useDummyText } from '../../../common/hooks';

import { VerticalPosterSubtitleProps } from './types';

const { getColor } = utils;

const VerticalPosterSubtitle = <MT extends MediaType>(props: VerticalPosterSubtitleProps<MT>): ReactElement => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { subtitle, inView } = props;

	const dummy = useDummyText({ orientation: 'vertical' });

	return (
		<Box
			width='100%'
			maxWidth='100%'
			height={`${getFontSizeHeight({ theme, fontSize: 'xs', lineHeight: 'normal' })}px`}
		>
			<Skeleton colorMode={colorMode} isLoaded={inView && !!subtitle} variant='text' speed={-1}>
				<Text
					align='left'
					fontSize='xs'
					fontWeight='normal'
					color={getColor({ theme, colorMode, type: 'text.secondary' })}
					lineHeight='normal'
					noOfLines={1}
				>
					{subtitle || dummy || 'Date • All Poster Genres • Subtitle'}
				</Text>
			</Skeleton>
		</Box>
	);
};

export default VerticalPosterSubtitle;
