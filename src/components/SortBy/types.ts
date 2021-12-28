import { ReactElement } from 'react';

import { Icon } from '../../common/types';
import { Color } from '../../theme/types';

export type SortBy = {
  label: string;
  value: string;
};

export type SortDirection = 'asc' | 'desc';

export type Form = {
  sortBy: SortBy;
  direction: SortDirection;
};

export type RenderToggleModalProps = {
  color: keyof Color;
  icon: Icon;
  onClick: () => void;
};

export type PartialForm = Partial<Form>;

export type SortByProps = {
  renderToggleModal: (props: RenderToggleModalProps) => ReactElement;
  defaultValues: Form;
  sortBy: SortBy[];
  onSort: (form: PartialForm) => void;
};
