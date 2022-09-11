import { BreadcrumbData } from 'use-react-router-breadcrumbs';

export type BreadcrumbProps = {
	isLoading?: boolean;
	isCurrentPage?: boolean;
	breadcrumb?: BreadcrumbData<string>;
};
