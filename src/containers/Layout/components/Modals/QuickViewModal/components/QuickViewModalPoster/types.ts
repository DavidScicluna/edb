import { BoxMargin, BoxPadding, ImageProps } from '@davidscicluna/component-library';

import { CenterProps } from '@chakra-ui/react';

import { ClickableMediaProps } from '../../../../../../../components/Clickable/ClickableMedia/types';

export type QuickViewModalPosterProps = Pick<ImageProps, 'alt' | 'src'> &
	Pick<ClickableMediaProps, 'onClick'> &
	Pick<CenterProps, BoxMargin | BoxPadding>;
