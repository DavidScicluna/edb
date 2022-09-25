import { FC } from 'react';

import { IconButton, IconButtonIcon } from '@davidscicluna/component-library';

import { useDispatch } from 'react-redux';

import { useSelector, useUserTheme } from '../../../../../../../../common/hooks';
import { toggleInternationalizationModal } from '../../../../../../../../store/slices/Modals';

import { InternationalizationProps } from './types';

const Internationalization: FC<InternationalizationProps> = (props) => {
	const { color, colorMode } = useUserTheme();

	const dispatch = useDispatch();
	const isInternationalizationModalOpen = useSelector((state) => state.modals.ui.isInternationalizationModalOpen);

	const { variant = 'icon', ...rest } = props;

	return (
		<IconButton
			{...rest}
			aria-label='Internationalization Button'
			color={isInternationalizationModalOpen ? color : 'gray'}
			colorMode={colorMode}
			onClick={() => dispatch(toggleInternationalizationModal(true))}
			variant={variant}
		>
			<IconButtonIcon icon='language' />
		</IconButton>
	);
};

export default Internationalization;
