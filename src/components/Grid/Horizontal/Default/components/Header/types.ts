import { ScrollMenu } from '../../../types';
import { HorizontalGridDefaultProps } from '../../types';

export type HeaderProps = {
	scrollMenu: ScrollMenu;
	isLeftDisabled?: boolean;
	isRightDisabled?: boolean;
} & Omit<HorizontalGridDefaultProps, 'children' | 'activeTab' | 'onChange'>;
