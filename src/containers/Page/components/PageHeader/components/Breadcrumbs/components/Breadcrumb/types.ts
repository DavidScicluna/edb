import { Undefinable } from '@davidscicluna/component-library';

import { BreadcrumbData } from 'use-react-router-breadcrumbs';

export type BreadcrumbLabel = Undefinable<string>;

export type BreadcrumbProps = BreadcrumbData & {
	isCurrentPage?: boolean;
};
