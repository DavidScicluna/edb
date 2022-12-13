import { ClickableMediaProps } from '../../../../components/Clickable/ClickableMedia/types';
import { ImageProps } from '../../../../components/Image/types';

export type ViewPosterProps = Pick<ImageProps, 'alt' | 'src'> & Pick<ClickableMediaProps, 'onClick'>;
