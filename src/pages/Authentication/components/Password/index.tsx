import { ReactElement } from 'react';

import { Input, Tooltip, IconButton, Icon } from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';

import { isBoolean } from 'lodash';

import { useUserTheme } from '../../../../common/hooks';

import { PasswordProps } from './types';

const Password = ({ field, fieldState, label = 'Password' }: PasswordProps): ReactElement => {
	const { color, colorMode } = useUserTheme();

	const [isVisible, setIsVisible] = useBoolean();
	const [isHovering, setIsHovering] = useBoolean();

	const { onChange, onBlur, value, name } = field;
	const { error } = fieldState;

	return (
		<Input
			color={color}
			colorMode={colorMode}
			label={label}
			name={name}
			helper={error ? error.message : undefined}
			placeholder={isVisible ? 'password' : '••••••••'}
			onBlur={onBlur}
			onChange={onChange}
			isError={isBoolean(error)}
			isFullWidth
			isRequired
			renderRightPanel={() => (
				<Tooltip
					aria-label={isVisible ? 'Hide password (tooltip)' : `Show ${label} (tooltip)`}
					label={isVisible ? 'Hide password' : `Show ${label}`}
					placement='top'
					isOpen={isHovering}
				>
					<IconButton
						aria-label={isVisible ? 'Hide password' : `Show ${label}`}
						onClick={() => setIsVisible.toggle()}
						onMouseEnter={() => setIsHovering.on()}
						onMouseLeave={() => setIsHovering.off()}
						size='sm'
						variant='icon'
					>
						<Icon icon={isVisible ? 'visibility_off' : 'visibility'} category='outlined' />
					</IconButton>
				</Tooltip>
			)}
			type={isVisible ? 'text' : 'password'}
			value={value}
		/>
	);
};

export default Password;
