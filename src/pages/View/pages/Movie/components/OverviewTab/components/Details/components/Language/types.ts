import { Language } from '../../../../../../../../../../store/slices/Options/types';

export type LanguageProps = {
  language?: Language['iso_639_1'];
  isLoading?: boolean;
};
