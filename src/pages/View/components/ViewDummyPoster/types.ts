import { BoxMargin, BoxPadding } from '@davidscicluna/component-library';

import { CenterProps } from '@chakra-ui/react';

export type ViewDummyPosterProps = Pick<CenterProps, BoxMargin | BoxPadding> & {
	isFullWidth?: boolean;
};
