import { ClickableMediaProps } from '../../../../../../../../components/Clickable/ClickableMedia/types';
import { ImageProps } from '../../../../../../../../components/Image/types';

export type ViewHeroCoverPosterProps = Pick<ImageProps, 'alt' | 'src'> & Pick<ClickableMediaProps, 'onClick'>;
