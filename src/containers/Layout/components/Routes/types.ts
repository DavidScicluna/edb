import { RouteProps } from 'react-router-dom';

export type Route = {
	breadcrumb?: string;
	children?: ({ breadcrumb?: string } & Route)[];
} & Omit<RouteProps, 'children'>;
