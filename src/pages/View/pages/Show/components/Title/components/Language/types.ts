import { FullTV } from '../../../../../../../../common/types/tv';
import { RenderProps } from '../../../../../../components/Title/types';

export type LanguageProps = {
  language: FullTV['original_language'];
  isLoading: boolean;
} & Omit<RenderProps, 'fontWeight'>;
