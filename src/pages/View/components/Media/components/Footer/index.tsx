import { ReactElement } from 'react';

import { useMediaQuery } from '@chakra-ui/react';

import { FooterProps } from './types';

import { useSelector } from '../../../../../../common/hooks';
import Button from '../../../../../../components/Clickable/Button';
import { defaultUser, getUser } from '../../../../../../store/slices/Users';

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
