import { ComponentType } from 'react';

import { RouteComponentProps, RouteProps } from 'react-router-dom';

import { Breadcrumb } from '../../../common/types/types';

export type DefaultRouteProps = {
  component: ComponentType<RouteComponentProps>;
  breadcrumbs: Breadcrumb[];
} & RouteProps;
