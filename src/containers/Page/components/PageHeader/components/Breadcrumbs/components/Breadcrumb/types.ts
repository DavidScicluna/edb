import { BreadcrumbData } from 'use-react-router-breadcrumbs';

export type BreadcrumbProps = {
	isCurrentPage?: boolean;
	breadcrumb?: BreadcrumbData<string>;
};
