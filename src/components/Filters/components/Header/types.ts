import { ReactElement } from 'react';

import { TextProps } from '@chakra-ui/react';


import { Color, FontSizes } from '../../../../theme/types';
import { Size, Variant } from '../../../Clickable/Button/types';

export type RenderMessageProps = {
  color: string;
  fontSize: keyof FontSizes;
  fontWeight: TextProps['fontWeight'];
};

export type RenderButtonProps = {
  color: keyof Color;
  size: Size;
  variant: Variant;
};

export type HeaderProps = {
  label: string;
  renderMessage: (props: RenderMessageProps) => ReactElement | undefined;
  renderButton: (props: RenderButtonProps) => ReactElement;
};
