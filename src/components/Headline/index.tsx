import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import { useUserTheme } from '../../common/hooks';

import { HeadlineProps } from './types';

const { getColor } = utils;

const Headline: FC<HeadlineProps> = ({ renderCaption, renderTitle, renderSubtitle, spacing = 0.5, ...rest }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	return (
		<VStack {...rest} width='100%' alignItems='flex-start' spacing={spacing}>
			{renderCaption &&
				renderCaption({
					align: 'left',
					color: getColor({ theme, colorMode, color, type: 'color' }),
					fontSize: 'sm',
					lineHeight: 'shorter',
					textTransform: 'uppercase'
				})}

			{renderTitle({
				align: 'left',
				color: getColor({ theme, colorMode, type: 'text.primary' }),
				fontSize: '6xl',
				fontWeight: 'bold',
				lineHeight: 'shorter'
			})}

			{/* Subtitle */}
			{renderSubtitle &&
				renderSubtitle({
					align: 'left',
					color: getColor({ theme, colorMode, type: 'text.secondary' }),
					fontSize: 'sm',
					lineHeight: 'shorter'
				})}
		</VStack>
	);
};

export default Headline;
