import { RouteProps } from 'react-router-dom';

import { BreadcrumbsRoute } from 'use-react-router-breadcrumbs';

// export type Route = {
// 	breadcrumb?: BreadcrumbComponentProps;
// 	children?: ({ breadcrumb?: BreadcrumbComponentProps } & Route)[];
// } & Omit<RouteProps, 'children'>;

export type Route = BreadcrumbsRoute & RouteProps;
