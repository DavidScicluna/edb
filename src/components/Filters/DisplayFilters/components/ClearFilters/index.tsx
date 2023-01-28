import { FC } from 'react';

import { useTheme, Tooltip, IconButton, IconButtonIcon } from '@davidscicluna/component-library';

import { useMediaQuery, useBoolean } from '@chakra-ui/react';

import defaultValues from '../../../common/data/defaults';
import { useUserTheme } from '../../../../../common/hooks';

import { ClearFiltersProps } from './types';

const ClearFilters: FC<ClearFiltersProps> = ({ onClear }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const [isHovering, setIsHovering] = useBoolean();

	return (
		<Tooltip
			colorMode={colorMode}
			aria-label='Clear Filters (tooltip)'
			label='Clear Filters'
			placement='top-end'
			isOpen={isHovering}
		>
			<IconButton
				colorMode={colorMode}
				isFullWidth={isSm}
				onClick={() => onClear({ ...defaultValues })}
				onMouseEnter={() => setIsHovering.on()}
				onMouseLeave={() => setIsHovering.off()}
				variant='outlined'
			>
				<IconButtonIcon icon='clear' />
			</IconButton>
		</Tooltip>
	);
};

export default ClearFilters;
