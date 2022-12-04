import { ReactNode, MouseEvent as ME } from 'react';

import { Color, Nullable } from '@davidscicluna/component-library';

import { AspectRatioProps, ColorMode } from '@chakra-ui/react';

export type ClickableMediaColor = Exclude<Color, 'transparent' | 'black' | 'white'>;

export type MouseEvent = ME<HTMLDivElement, globalThis.MouseEvent>;

export type RenderIconProps = Pick<ClickableMediaProps, 'colorMode'> & { color?: string };

export type ClickableMediaProps = Omit<AspectRatioProps, 'onClick'> & {
	color?: ClickableMediaColor;
	colorMode?: ColorMode;
	isActive?: boolean;
	isDisabled?: boolean;
	onClick?: (event: MouseEvent) => void;
	renderIcon: (props: RenderIconProps) => ReactNode;
};

// TODO: GO over all Ref types and place them at the bottom with Nullable
export type ClickableMediaRef = Nullable<HTMLDivElement>;
