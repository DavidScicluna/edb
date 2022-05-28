import { ReactElement, forwardRef, memo } from 'react';

import { useTheme } from '@davidscicluna/component-library';

import { Box } from '@chakra-ui/react';

import { ScrollMenu } from 'react-horizontal-scrolling-menu';

import './common/styles/styles.css';
import { handleConvertStringToNumber } from '../../common/utils';

import Child from './components/Child';
import LeftArrow from './components/LeftArrow';
import RightArrow from './components/RightArrow';
import { HorizontalScrollRef, HorizontalScrollProps } from './types';

const HorizontalScroll = forwardRef<HorizontalScrollRef, HorizontalScrollProps>(function HorizontalScroll(
	props,
	ref
): ReactElement {
	const theme = useTheme();

	const { children, renderDivider, colorMode, isDisabled = false, isFullWidth = false } = props;

	return (
		<Box ref={ref} width='100%'>
			<ScrollMenu
				LeftArrow={<LeftArrow colorMode={colorMode} isDisabled={isDisabled} />}
				RightArrow={<RightArrow colorMode={colorMode} isDisabled={isDisabled} />}
				transitionDuration={handleConvertStringToNumber(theme.transition.duration['ultra-slow'], 'ms')}
				wrapperClassName='wrapperContainer'
				scrollContainerClassName={isFullWidth ? 'scrollFullWidthContainer' : 'scrollContainer'}
			>
				{children.map((child, index) => (
					<Child
						key={`child-${index}`}
						itemId={`child-${index}`}
						renderDivider={renderDivider}
						isLast={index === children.length - 1}
					>
						{child}
					</Child>
				))}
			</ScrollMenu>
		</Box>
	);
});

export default memo(HorizontalScroll);
