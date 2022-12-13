import { MediaType } from '../../../../common/types';

export type ViewAlertProps = {
	mediaType: Exclude<MediaType, 'person' | 'company' | 'collection'>;
	title: string;
	date: string;
};
