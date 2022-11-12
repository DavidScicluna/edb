import { FC } from 'react';

import { CardBody } from '@davidscicluna/component-library';

import { DummyHorizontalGridBodyProps } from './types';

const DummyHorizontalGridBody: FC<DummyHorizontalGridBodyProps> = ({ children, ...rest }) => {
	return (
		<CardBody {...rest} alignItems='stretch' justifyContent='stretch'>
			{children}
		</CardBody>
	);
};

export default DummyHorizontalGridBody;
