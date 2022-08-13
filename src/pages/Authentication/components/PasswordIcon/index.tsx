import { ReactElement } from 'react';

import { Tooltip, Icon } from '@davidscicluna/component-library';

import { Center } from '@chakra-ui/react';

import { useUserTheme } from '../../../../common/hooks';

import { PasswordIconProps } from './types';

const PasswordIcon = (props: PasswordIconProps): ReactElement => {
	const { colorMode } = useUserTheme();

	const { label = 'Password', isVisible = false, isHovering = false, setIsVisible, setIsHovering, ...rest } = props;

	console.log(props);

	return (
		<Tooltip
			colorMode={colorMode}
			aria-label={isVisible ? 'Hide PasswordIcon (tooltip)' : `Show ${label} (tooltip)`}
			label={isVisible ? 'Hide PasswordIcon' : `Show ${label}`}
			placement='top'
			isOpen={isHovering}
		>
			<Center
				{...rest}
				aria-label={isVisible ? 'Hide password' : `Show ${label}`}
				onClick={() => setIsVisible.toggle()}
				onMouseEnter={() => setIsHovering.on()}
				onMouseLeave={() => setIsHovering.off()}
			>
				<Icon icon={isVisible ? 'visibility_off' : 'visibility'} category='outlined' />
			</Center>
		</Tooltip>
	);
};

export default PasswordIcon;
