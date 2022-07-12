import { Color, ModalProps } from '@davidscicluna/component-library';

export type SplashscreenColor = Exclude<Color, 'transparent' | 'black' | 'white' | 'gray'>;

export type SplashscreenProps = Pick<ModalProps, 'isOpen' | 'onClose'>;
