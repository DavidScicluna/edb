import { ExternalIDs } from '../../common/types';

export type SocialsProps = {
  socials?: ExternalIDs;
  name?: string;
  orientation?: 'vertical' | 'horizontal';
  isLoading?: boolean;
  isDisabled?: boolean;
};
