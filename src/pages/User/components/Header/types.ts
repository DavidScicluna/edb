import { MediaType } from '../../../../common/types';

type DisabledMediaTypes = { [key in MediaType]?: boolean };

export type HeaderProps = {
  activeTab?: number;
  mediaTypes?: MediaType[];
  isDisabled: DisabledMediaTypes;
};
