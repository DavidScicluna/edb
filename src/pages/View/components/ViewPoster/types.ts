import { BoxMargin, BoxPadding } from '@davidscicluna/component-library';

import { CenterProps } from '@chakra-ui/react';

import { ClickableMediaProps } from '../../../../components/Clickable/ClickableMedia/types';
import { ImageProps } from '../../../../components/Image/types';

export type ViewPosterProps = Pick<ImageProps, 'alt' | 'src'> & {
	isFullWidth?: boolean;
} & Pick<ClickableMediaProps, 'onClick'> &
	Pick<CenterProps, BoxMargin | BoxPadding>;
