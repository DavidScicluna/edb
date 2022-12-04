import { Image } from '../../../../../../../../../common/types';
import { FullPerson } from '../../../../../../../../../common/types/person';

export type PhotosTabPhotoProps = Image & {
	index: number;
} & Pick<FullPerson, 'name'>;
