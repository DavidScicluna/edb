import { Color, ModalProps } from '@davidscicluna/component-library';

export type SpinnerColor = Exclude<Color, 'transparent' | 'black' | 'white' | 'gray'>;

export type SpinnerProps = Pick<ModalProps, 'isOpen' | 'onClose'>;
