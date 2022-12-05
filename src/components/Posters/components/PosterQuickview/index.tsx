import { ReactElement } from 'react';

import { Tooltip, IconButton, IconButtonIcon } from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';

import { useSelector, useUserTheme } from '../../../../common/hooks';
import { MediaType } from '../../../../common/types';
import { setQuickViewModal } from '../../../../store/slices/Modals';
import { PosterMouseEvent } from '../../common/types';

import { PosterQuickviewProps } from './types';

const PosterQuickview = <MT extends MediaType>(props: PosterQuickviewProps<MT>): ReactElement => {
	const { color, colorMode } = useUserTheme();

	const dispatch = useDispatch();
	const { isOpen: isQuickViewModalOpen, mediaItem: quickViewModalMediaItem } = useSelector(
		(state) => state.modals.ui.quickViewModal
	);

	const { title, mediaType, mediaItem, size = 'md' } = props;

	const [isHovering, setIsHovering] = useBoolean();

	return (
		<Tooltip
			colorMode={colorMode}
			aria-label={`Quick view ${title} ${mediaType} (tooltip)`}
			label={`Quick view ${title}`}
			placement='top'
			isOpen={isHovering}
			gutter={2}
		>
			<IconButton
				aria-label={`Quick view ${title} ${mediaType}`}
				color={isQuickViewModalOpen && quickViewModalMediaItem?.id === mediaItem?.id ? color : 'gray'}
				onClick={(event: PosterMouseEvent) => {
					event.preventDefault();
					event.stopPropagation();

					dispatch(setQuickViewModal({ isOpen: true, mediaType, mediaItem }));
				}}
				onMouseEnter={() => setIsHovering.on()}
				onMouseLeave={() => setIsHovering.off()}
				size={size}
				variant='icon'
			>
				<IconButtonIcon icon='aspect_ratio' category='outlined' />
			</IconButton>
		</Tooltip>
	);
};

export default PosterQuickview;
