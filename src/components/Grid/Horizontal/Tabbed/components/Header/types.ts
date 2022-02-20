import { ScrollMenu } from '../../../types';
import { HorizontalGridTabbedProps } from '../../types';

export type HeaderProps = {
	scrollMenu: ScrollMenu;
	isLeftDisabled?: boolean;
	isRightDisabled?: boolean;
} & Omit<HorizontalGridTabbedProps, 'children' | 'activeTab' | 'onChange'>;
