import { FC } from 'react';

import { DummyCard, DummyCardProps as DummyHorizontalGridProps } from '@davidscicluna/component-library';

const DummyHorizontalGrid: FC<DummyHorizontalGridProps> = ({ children, ...rest }) => {
	return <DummyCard {...rest}>{children}</DummyCard>;
};

export default DummyHorizontalGrid;
