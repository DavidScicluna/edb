import { FC } from 'react';

import { DummyLikeProps } from './types';

const DummyLike: FC<DummyLikeProps> = ({ renderAction }) => {
	return renderAction({
		iconType: 'favorite_border',
		iconCategory: 'outlined'
	});
};

export default DummyLike;
