import { PageProps } from '../../types';

export type HeaderProps = {
	actions: PageProps['children']['actions'];
} & Omit<PageProps, 'children'>;
