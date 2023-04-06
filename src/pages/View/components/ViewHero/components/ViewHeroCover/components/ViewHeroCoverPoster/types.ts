import { ImageProps } from '@davidscicluna/component-library';

import { ClickableMediaProps } from '../../../../../../../../components/Clickable/ClickableMedia/types';

export type ViewHeroCoverPosterProps = Pick<ImageProps, 'alt' | 'src'> & Pick<ClickableMediaProps, 'onClick'>;
