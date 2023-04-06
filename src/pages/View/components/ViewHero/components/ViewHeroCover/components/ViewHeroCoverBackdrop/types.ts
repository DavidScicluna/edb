import { ImageProps } from '@davidscicluna/component-library';

import { Video } from '../../../../../../../../common/types';
import { ClickableMediaProps } from '../../../../../../../../components/Clickable/ClickableMedia/types';

export type ViewHeroCoverBackdropProps = Pick<ImageProps, 'alt' | 'src'> & {
	hasVideo?: boolean;
	type?: Video['type'];
} & Pick<ClickableMediaProps, 'onClick'>;
