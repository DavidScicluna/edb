import { MediaType } from '../../../../../../../common/types';
import { GenresProps as GenresStepProps } from '../../types';

export type GenresProps = {
	mediaType: Omit<MediaType, 'person' | 'company' | 'collection'>;
} & GenresStepProps;
