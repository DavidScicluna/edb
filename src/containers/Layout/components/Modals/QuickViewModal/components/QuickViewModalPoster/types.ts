import { BoxMargin, BoxPadding } from '@davidscicluna/component-library';

import { CenterProps } from '@chakra-ui/react';

import { ClickableMediaProps } from '../../../../../../../components/Clickable/ClickableMedia/types';
import { ImageProps } from '../../../../../../../components/Image/types';

export type QuickViewModalPosterProps = Pick<ImageProps, 'alt' | 'src'> &
	Pick<ClickableMediaProps, 'onClick'> &
	Pick<CenterProps, BoxMargin | BoxPadding>;
