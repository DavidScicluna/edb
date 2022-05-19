import { ReactElement } from 'react';

import { Button } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';


import { useSelector } from '../../../../../../common/hooks';
import { defaultUser, getUser } from '../../../../../../store/slices/Users';

import { FooterProps } from './types';

const Footer = (props: FooterProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const { total, label, isDisabled = false, onClick } = props;

	return (
		<Button
			color={color}
			isFullWidth
			isDisabled={isDisabled}
			onClick={onClick ? () => onClick() : undefined}
			size={isSm ? 'sm' : 'md'}
			variant='text'
		>
			{`View all ${total || ''} ${label || 'Assets'}`}
		</Button>
	);
};

export default Footer;
