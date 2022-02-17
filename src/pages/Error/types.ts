import { ReactElement } from 'react';

import { ColorMode } from '@chakra-ui/react';


export type DescriptionRef = HTMLDivElement | null;

import { Size } from '../../components/Clickable/Button/types';
import { Color } from '../../theme/types';

export type RenderActionsProps = {
  color: keyof Color;
  colorMode: ColorMode;
  size: Size;
};

export type ErrorProps = {
  code: number;
  title: string;
  subtitle: string;
  renderActions?: ({ color, colorMode, size }: RenderActionsProps) => ReactElement;
};
