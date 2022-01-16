import { ReactElement } from 'react';

import { MediaType } from '../../../../common/types';

type DisabledMediaTypes = { [key in MediaType]?: boolean };

export type MediaTypesHeaderProps = {
  activeTab?: number;
  mediaTypes?: MediaType[];
  isDisabled: DisabledMediaTypes;
  renderActions?: () => ReactElement;
};
