import { MediaType } from '../../../../common/types';
import { RenderProps } from '../../../../containers/Page/types';

export type VerticalPosterProps = {
	alt?: string;
	path?: string;
	mediaType: MediaType;
	srcSize: [string, string];
	isLoading: boolean;
	onClickPoster: (path: string) => void;
} & RenderProps;
