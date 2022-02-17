import { MediaType } from '../../../../../../../../common/types';

export type BackdropProps = {
	alt?: string;
	path?: string | null;
	mediaType: Omit<MediaType, 'company' | 'collection'>;
	video?: boolean;
	isLoading?: boolean;
	isError?: boolean;
	onClick: (path: string, video: boolean) => void;
};
