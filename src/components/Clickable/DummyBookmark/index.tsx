import { FC } from 'react';

import { DummyBookmarkProps } from './types';

const DummyBookmark: FC<DummyBookmarkProps> = ({ renderAction }) => {
	return renderAction({
		iconType: 'bookmark_border',
		iconCategory: 'outlined'
	});
};

export default DummyBookmark;
