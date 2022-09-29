import { DummyCardHeaderProps } from '@davidscicluna/component-library';

import { DummyArrowsProps } from '../../../components/DummyArrows/types';

export type DummyHorizontalGridHeaderProps = Pick<DummyArrowsProps, 'dummyArrowProps'> & DummyCardHeaderProps;
