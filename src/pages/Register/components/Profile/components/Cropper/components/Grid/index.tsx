import React, { ReactElement } from 'react';

import { useBoolean } from '@chakra-ui/react';

import { GridProps } from './types';

import IconButton from '../../../../../../../../components/Clickable/IconButton';
import Icon from '../../../../../../../../components/Icon';
import Tooltip from '../../../../../../../../components/Tooltip';

const Grid = ({ colorMode, isActive = false, onToggle }: GridProps): ReactElement => {
	const [isHovering, setIsHovering] = useBoolean();

	return (
		<Tooltip
			aria-label={isActive ? 'Turn off Grid (Tooltip)' : 'Turn on Grid (Tooltip)'}
			colorMode={colorMode}
			isOpen={isHovering}
			placement='top'
			label={isActive ? 'Turn off Grid' : 'Turn on Grid'}
		>
			<IconButton
				aria-label={isActive ? 'Turn off Grid (Tooltip)' : 'Turn on Grid (Tooltip)'}
				colorMode={colorMode}
				onClick={() => onToggle()}
				onMouseEnter={() => setIsHovering.on()}
				onMouseLeave={() => setIsHovering.off()}
				variant='icon'
			>
				<Icon icon={!isActive ? 'grid_off' : 'grid_on'} type='outlined' />
			</IconButton>
		</Tooltip>
	);
};

export default Grid;
