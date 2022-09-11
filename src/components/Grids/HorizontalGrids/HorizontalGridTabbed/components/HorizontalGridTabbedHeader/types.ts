import { CardHeaderProps, TabListProps } from '@davidscicluna/component-library';

import { ArrowsProps } from '../../../components/Arrows/types';

export type HorizontalGridTabbedHeaderProps = CardHeaderProps & {
	tabListProps: TabListProps;
} & Pick<ArrowsProps, 'iconButtonProps'>;
