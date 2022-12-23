import { Video } from '../../../../../../../../common/types';
import { ClickableMediaProps } from '../../../../../../../../components/Clickable/ClickableMedia/types';
import { ImageProps } from '../../../../../../../../components/Image/types';

export type ViewHeroCoverBackdropProps = Pick<ImageProps, 'alt' | 'src'> & {
	hasVideo?: boolean;
	type?: Video['type'];
} & Pick<ClickableMediaProps, 'onClick'>;
