import { ReactElement } from 'react';

import { useMediaQuery, VStack, Center, Stack, HStack } from '@chakra-ui/react';
import { useElementSize } from 'usehooks-ts';

import Breadcrumbs from './components/Breadcrumbs';
import Title from './components/Title';
import { HeaderProps } from './types';

const Header = (props: HeaderProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');
	const [isMd] = useMediaQuery('(max-width: 960px)');

	const [leftRef, { width: leftWidth }] = useElementSize();
	const [rightRef, { width: rightWidth }] = useElementSize();

	const [containerRef, { width: containerWidth, height: containerHeight }] = useElementSize();
	const [actionsRef, { width: actionsWidth }] = useElementSize();

	const { title, actions, renderLeftHeaderPanel, renderRightHeaderPanel, direction } = props;

	return (
		<HStack width='100%' p={2} spacing={2}>
			{renderLeftHeaderPanel && !isMd ? (
				<Center ref={leftRef}>
					{renderLeftHeaderPanel({ width: containerWidth, height: containerHeight })}
				</Center>
			) : null}

			<Stack
				ref={containerRef}
				width={`calc(100% - ${
					(renderLeftHeaderPanel ? leftWidth + 16 : 0) + (renderRightHeaderPanel ? rightWidth + 16 : 0)
				}px)`}
				direction={direction ? direction : isSm ? 'column' : 'row'}
				alignItems='center'
				justifyContent='space-between'
				spacing={isSm ? 2 : 6}
			>
				<VStack
					width={isSm ? '100%' : `calc(100% - ${actions ? actionsWidth + 48 : 0}px)`}
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

			{renderRightHeaderPanel && !isMd ? (
				<Center ref={rightRef}>
					{renderRightHeaderPanel({ width: containerWidth, height: containerHeight })}
				</Center>
			) : null}
		</HStack>
	);
};

export default Header;
