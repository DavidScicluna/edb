import { ReactNode } from 'react';

import { ColorMode } from '@chakra-ui/react';

import { UserThemeColor } from '../../../../store/slices/Users/types';

type RenderProps = Pick<UserAssetsStructureProps, 'color' | 'colorMode'>;

export type UserAssetsStructureProps = {
	color?: UserThemeColor;
	colorMode?: ColorMode;
	renderUserAvatar: (props: RenderProps) => ReactNode;
	renderUserBackground: (props: RenderProps) => ReactNode;
	renderUserDetails: (props: RenderProps) => ReactNode;
};
