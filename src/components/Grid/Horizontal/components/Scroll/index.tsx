import { ReactElement } from 'react';

import { useTheme } from '@davidscicluna/component-library';

import { ScrollMenu } from 'react-horizontal-scrolling-menu';

import { handleConvertStringToNumber } from '../../../../../common/utils';

import Child from './components/Child';
import { ScrollProps } from './types';

const Scroll = ({ children, ...rest }: ScrollProps): ReactElement => {
	const theme = useTheme();

	return (
		<ScrollMenu
			{...rest}
			transitionDuration={handleConvertStringToNumber(theme.transition.duration['ultra-slow'], 'ms')}
		>
			{children.map((child, index) => (
				<Child key={`child-${index}`} itemId={`child-${index}`} isLast={index === children.length - 1}>
					{child}
				</Child>
			))}
		</ScrollMenu>
	);
};

export default Scroll;
