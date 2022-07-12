import { Style } from '@davidscicluna/component-library';

export type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type LogoProps = {
	isClickable?: boolean;
	size?: LogoSize;
	sx?: Style;
};
