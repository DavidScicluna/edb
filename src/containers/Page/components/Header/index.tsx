import { ReactElement } from 'react';

import { useMediaQuery, VStack, Center, Stack, HStack } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import Breadcrumbs from './components/Breadcrumbs';
import Title from './components/Title';
import { HeaderProps } from './types';

const Header = (props: HeaderProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');
	const [isMd] = useMediaQuery('(max-width: 960px)');

	const [containerRef, { width: containerWidth, height: containerHeight }] = useElementSize();
	const [actionsRef, { width: actionsWidth }] = useElementSize();

	const { title, actions, renderLeftHeaderPanel, renderRightHeaderPanel, direction } = props;

	return (
		<HStack width='100%' p={2} spacing={2}>
			{renderLeftHeaderPanel && !isMd
				? renderLeftHeaderPanel({ width: containerWidth, height: containerHeight })
				: null}

			<Stack
				ref={containerRef}
				width='100%'
				direction={direction ? direction : isSm ? 'column' : 'row'}
				alignItems='center'
				justifyContent='space-between'
				spacing={isSm ? 2 : 4}
			>
				<VStack
					width={isSm ? '100%' : `calc(100% - ${actions ? actionsWidth + 32 : 0}px)`}
					alignItems='flex-start'
					spacing={0.5}
				>
					<Breadcrumbs />
					{title ? <Title title={title} /> : null}
				</VStack>

				{actions ? (
					<Center ref={actionsRef} width={direction ? 'auto' : isSm ? '100%' : 'auto'} height='100%'>
						{actions}
					</Center>
				) : null}
			</Stack>

			{renderRightHeaderPanel && !isMd
				? renderRightHeaderPanel({ width: containerWidth, height: containerHeight })
				: null}
		</HStack>
	);
};

export default Header;
