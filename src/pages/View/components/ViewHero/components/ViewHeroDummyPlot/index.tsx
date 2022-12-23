import { FC } from 'react';

import { FontSize, LineHeight, useTheme, Skeleton } from '@davidscicluna/component-library';

import { useConst, VStack } from '@chakra-ui/react';

import { range } from 'lodash';

import ViewHeroLabel from '../ViewHeroLabel';
import { useUserTheme } from '../../../../../../common/hooks';
import { getFontSizeHeight } from '../../../../../../common/utils';
import ViewHeroText from '../ViewHeroText';

import { ViewHeroDummyPlotProps } from './types';

const lines = 3;

const ViewHeroDummyPlot: FC<ViewHeroDummyPlotProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const fontSize = useConst<FontSize>('md');
	const lineHeight = useConst<LineHeight>('shorter');

	return (
		<ViewHeroLabel {...props} label='Plot'>
			<VStack
				width='100%'
				alignItems='flex-start'
				justifyContent='center'
				spacing={`${getFontSizeHeight({ theme, fontSize, lineHeight })}px`}
			>
				{range(lines).map((_dummy, index) => (
					<Skeleton key={index} width='100%' colorMode={colorMode} isLoaded={false} variant='text'>
						<ViewHeroText fontWeight='normal'>Plot</ViewHeroText>
					</Skeleton>
				))}
			</VStack>
		</ViewHeroLabel>
	);
};

export default ViewHeroDummyPlot;
