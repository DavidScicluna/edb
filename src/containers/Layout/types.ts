import { ReactNode } from 'react';

import { Space } from '@davidscicluna/component-library';

export type LayoutSpacing = Space;

export type LayoutContext = { isGuest?: boolean; isAuthenticationRoute?: boolean; spacing?: LayoutSpacing };

export type LayoutProps = { children: ReactNode };
