import { BreadcrumbComponentProps } from 'use-react-router-breadcrumbs';

import { MediaType } from '../../../../../../common/types';
import { Collection, FullMovie } from '../../../../../../common/types/movie';
import { FullPerson } from '../../../../../../common/types/person';
import { FullTV } from '../../../../../../common/types/tv';
export type Data = FullMovie & FullTV & FullPerson & Collection;

export type BreadcrumbProps = {
	mediaType: MediaType;
} & BreadcrumbComponentProps;
