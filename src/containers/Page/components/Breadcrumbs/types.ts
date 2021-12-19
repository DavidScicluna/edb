import { MediaType } from '../../../../common/types';
import { Breadcrumb } from '../../types';

export type Params = {
  id: string;
  mediaType: MediaType;
};

export type BreadcrumbsProps = {
  breadcrumbs: Breadcrumb[];
};
