import React, { FC } from 'react';

import { DummyIconButton, IconButton, IconButtonIcon } from '@davidscicluna/component-library';

import { useDispatch } from 'react-redux';

import { useSelector, useUserTheme } from '../../../../../../common/hooks';
import { toggleInternationalizationModal } from '../../../../../../store/slices/Modals';

import { InternationalizationIconButtonProps } from './types';

const InternationalizationIconButton: FC<InternationalizationIconButtonProps> = ({ isDummy = false }) => {
	const { color, colorMode } = useUserTheme();

	const dispatch = useDispatch();
	const isInternationalizationModalOpen = useSelector((state) => state.modals.ui.isInternationalizationModalOpen);

	return !isDummy ? (
		<IconButton
			aria-label='Internationalization Button'
			color={isInternationalizationModalOpen ? color : 'gray'}
			colorMode={colorMode}
			onClick={() => dispatch(toggleInternationalizationModal(true))}
			variant='icon'
		>
			<IconButtonIcon icon='language' />
		</IconButton>
	) : (
		<DummyIconButton aria-label='Internationalization Dummy Button' colorMode={colorMode} variant='icon'>
			<IconButtonIcon icon='language' />
		</DummyIconButton>
	);
};

export default InternationalizationIconButton;
