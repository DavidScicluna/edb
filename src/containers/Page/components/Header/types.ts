import { PageChildren, PageProps } from '../../types';

export type HeaderProps = Omit<PageChildren, 'body'> & Omit<PageProps, 'children'>;
