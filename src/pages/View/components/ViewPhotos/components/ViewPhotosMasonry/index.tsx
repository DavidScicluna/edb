import { ReactElement, useState } from 'react';

import { Space, useTheme, utils } from '@davidscicluna/component-library';

import { Masonry } from 'masonic';
import { useUpdateEffect } from 'usehooks-ts';

import { useLayoutContext } from '../../../../../../containers/Layout/common/hooks';
import { useSelector } from '../../../../../../common/hooks';

import { ViewPhotosMasonryProps } from './types';

const { convertREMToPixels, convertStringToNumber } = utils;

const ViewPhotosMasonry = <M,>(props: ViewPhotosMasonryProps<M>): ReactElement => {
	const theme = useTheme();

	const { spacing } = useLayoutContext();

	const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);

	const [show, setShow] = useState<0 | 1>(0);
	const [gutter, setGutter] = useState(
		convertREMToPixels(convertStringToNumber(theme.space[spacing as Space], 'rem'))
	);

	useUpdateEffect(() => {
		setGutter(convertREMToPixels(convertStringToNumber(theme.space[spacing as Space], 'rem')));
	}, [spacing]);

	useUpdateEffect(() => {
		setTimeout(() => setShow(show === 0 ? 1 : 0), 1000);
	}, [sidebarMode]);

	switch (show) {
		case 0:
			return (
				<Masonry<M> key='ds-edb-view-photos-masonry-0' {...props} rowGutter={gutter} columnGutter={gutter} />
			);
		case 1:
			return (
				<Masonry<M> key='ds-edb-view-photos-masonry-1' {...props} rowGutter={gutter} columnGutter={gutter} />
			);
	}
};

export default ViewPhotosMasonry;
