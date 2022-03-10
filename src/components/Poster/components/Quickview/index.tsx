import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { useBoolean } from '@chakra-ui/react';

import { PosterQuickviewProps } from './types';

import { useSelector } from '../../../../common/hooks';
import { MediaType } from '../../../../common/types';
import { toggleQuickView } from '../../../../store/slices/Modals';
import { defaultUser, getUser } from '../../../../store/slices/Users';
import IconButton from '../../../Clickable/IconButton';
import Icon from '../../../Icon';
import Tooltip from '../../../Tooltip';

const PosterQuickview = <MT extends MediaType>(props: PosterQuickviewProps<MT>): ReactElement => {
	const dispatch = useDispatch();
	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);
	const quickViewModal = useSelector((state) => state.modals.ui.quickViewModal);

	const { title, mediaType, mediaItem, isLoading = true, size = 'md' } = props;

	const [isHovering, setIsHovering] = useBoolean();

	const isDisabled: boolean = isLoading || !mediaItem;

	return (
		<Tooltip
			aria-label={`Quick view "${title}" ${mediaType} (tooltip)`}
			label={`Quick view "${title}"`}
			placement='top'
			isOpen={!isDisabled && isHovering}
			isDisabled={isDisabled}
			gutter={2}
		>
			<IconButton
				aria-label={`Quick view "${title}" ${mediaType} (tooltip)`}
				color={quickViewModal.open && quickViewModal.mediaItem?.id === mediaItem?.id ? color : 'gray'}
				isDisabled={isDisabled}
				onClick={(event) => {
					event.preventDefault();
					event.stopPropagation();

					dispatch(
						toggleQuickView({
							open: true,
							mediaType,
							mediaItem: { id: mediaItem?.id || -1, title }
						})
					);
				}}
				onMouseEnter={() => setIsHovering.on()}
				onMouseLeave={() => setIsHovering.off()}
				size={size}
				variant='icon'
			>
				<Icon icon='zoom_out_map' type='outlined' />
			</IconButton>
		</Tooltip>
	);
};

export default PosterQuickview;
