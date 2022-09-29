import { CardHeaderProps } from '@davidscicluna/component-library';

import { ArrowsProps } from '../../../components/Arrows/types';

export type HorizontalGridHeaderProps = CardHeaderProps & Pick<ArrowsProps, 'arrowProps'>;
