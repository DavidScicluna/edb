import { ExternalIDs } from '../../../../../../../common/types/person';

export type SocialsProps = {
  socials?: ExternalIDs;
  name?: string;
  isLoading?: boolean;
  orientation?: 'vertical' | 'horizontal';
};
