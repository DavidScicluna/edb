import { ReactElement } from 'react';

import { Tooltip, Icon } from '@davidscicluna/component-library';

import { Center } from '@chakra-ui/react';

import { useUserTheme } from '../../../../common/hooks';

import { PasswordIconProps } from './types';

const PasswordIcon = (props: PasswordIconProps): ReactElement => {
	const { colorMode } = useUserTheme();

	const {
		label = 'Password',
		isVisible = false,
		isHovering = false,
		setIsVisible,
		setIsHovering,
		iconProps = {},
		...rest
	} = props;

	return (
		<Tooltip
			colorMode={colorMode}
			aria-label={isVisible ? `Hide ${label} (tooltip)` : `Show ${label} (tooltip)`}
			label={isVisible ? `Hide ${label}` : `Show ${label}`}
			placement='top-end'
			isOpen={isHovering}
		>
			<Center
				{...rest}
				aria-label={isVisible ? `Hide ${label}` : `Show ${label}`}
				onClick={() => setIsVisible.toggle()}
				onMouseEnter={() => setIsHovering.on()}
				onMouseLeave={() => setIsHovering.off()}
			>
				<Icon
					{...iconProps}
					colorMode={colorMode}
					icon={isVisible ? 'visibility_off' : 'visibility'}
					category='outlined'
				/>
			</Center>
		</Tooltip>
	);
};

export default PasswordIcon;
