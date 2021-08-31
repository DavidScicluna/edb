import { ErrorProps } from '../../types';

export type CodeProps = Omit<ErrorProps, 'actions' | 'title' | 'subtitle'>;
