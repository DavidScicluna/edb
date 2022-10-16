import { FC } from 'react';

import { CardBody } from '@davidscicluna/component-library';

import { HorizontalGridBodyProps } from './types';

const HorizontalGridBody: FC<HorizontalGridBodyProps> = ({ children, ...rest }) => {
	return <CardBody {...rest}>{children}</CardBody>;
};

export default HorizontalGridBody;
