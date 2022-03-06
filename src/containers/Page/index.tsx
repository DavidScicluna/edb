import { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

import { useBoolean, VStack, Box, Collapse } from '@chakra-ui/react';

import { useEffectOnce } from 'usehooks-ts';

import Header from './components/Header';
import { PageProps } from './types';

import Divider from '../../components/Divider';

const Page = ({ children, title, direction }: PageProps): ReactElement => {
	const location = useLocation();

	const [isHome, setIsHome] = useBoolean(true);

	useEffectOnce(() => {
		if (location.pathname === '/') {
			setTimeout(() => setIsHome.on(), 2500);
		} else {
			setIsHome.off();
		}
	});

	return (
		<VStack width='100%' divider={!isHome ? <Divider /> : undefined} spacing={0}>
			{/* Header */}
			<Collapse in={!isHome} unmountOnExit style={{ width: '100%' }}>
				<Header title={title} actions={children.actions} direction={direction} />{' '}
			</Collapse>

			{/* Body */}
			<Box width='100%'>{children.body}</Box>
		</VStack>
	);
};

export default Page;
