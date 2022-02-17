import { FullMovie } from '../../../../../../../../common/types/movie';
import { RenderProps } from '../../../../../../components/Title/types';

export type LanguageProps = {
	language: FullMovie['original_language'];
	isLoading: boolean;
} & Omit<RenderProps, 'fontWeight'>;
