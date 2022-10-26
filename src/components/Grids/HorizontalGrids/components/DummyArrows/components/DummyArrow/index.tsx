import { FC } from 'react';

import { DummyIconButton, IconButtonIcon } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../../../../common/hooks';

import { DummyArrowProps } from './types';

const DummyArrow: FC<DummyArrowProps> = (props) => {
	const { colorMode } = useUserTheme();

	const { direction, ...rest } = props;

	return (
		<DummyIconButton {...rest} aria-label={`Scroll ${direction}`} colorMode={colorMode}>
			<IconButtonIcon icon={direction === 'left' ? 'arrow_back' : 'arrow_forward'} category='outlined' />
		</DummyIconButton>
	);
};

export default DummyArrow;
