import { ReactNode } from 'react';

import { Space } from '@davidscicluna/component-library';

export type LayoutDeviceType = 'mobile' | 'tablet' | 'desktop';

export type LayoutSpacing = Space;

export type LayoutContext = {
	device: LayoutDeviceType;
	isGuest?: boolean;
	isAuthenticationRoute?: boolean;
	spacing?: LayoutSpacing;
};

export type LayoutProps = { children: ReactNode };
