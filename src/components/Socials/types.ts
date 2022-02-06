import { ExternalIDs } from '../../common/types';

export type SocialsProps = {
  alt?: string;
  socials?: ExternalIDs;
  orientation?: 'vertical' | 'horizontal';
  isLoading?: boolean;
  isDisabled?: boolean;
};
