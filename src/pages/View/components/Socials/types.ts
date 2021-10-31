import { ExternalIDs } from '../../../../common/types/types';

export type SocialsProps = {
  socials?: ExternalIDs;
  name?: string;
  orientation?: 'vertical' | 'horizontal';
  color: string;
  isLoading?: boolean;
};
