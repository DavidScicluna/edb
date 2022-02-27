import { ReactElement } from 'react';

import { useMediaQuery, VStack, Center, Stack } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import Breadcrumbs from './components/Breadcrumbs';
import Title from './components/Title';
import { HeaderProps } from './types';

const Header = ({ title, actions, direction }: HeaderProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const [ref, { width }] = useElementSize();

	return (
		<Stack
			width='100%'
			direction={direction ? direction : isSm ? 'column' : 'row'}
			justifyContent='space-between'
			p={2}
			spacing={isSm ? 2 : 4}
		>
			<VStack
				width={isSm ? '100%' : `calc(100% - ${actions ? width + 32 : 0}px)`}
				alignItems='flex-start'
				spacing={0}
			>
				<Breadcrumbs />
				{title ? <Title title={title} /> : null}
			</VStack>

			{actions ? (
				<Center ref={ref} width={direction ? 'auto' : isSm ? '100%' : 'auto'}>
					{actions}
				</Center>
			) : null}
		</Stack>
	);
};

export default Header;
