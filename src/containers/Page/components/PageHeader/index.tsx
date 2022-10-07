import { FC, useCallback } from 'react';

import { Space, useTheme, utils } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Center, Stack, HStack } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { useUserTheme } from '../../../../common/hooks';

import Breadcrumbs from './components/Breadcrumbs';
import { PageHeaderProps } from './types';

const { convertREMToPixels, convertStringToNumber, getColor } = utils;

const PageHeader: FC<PageHeaderProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
	const [isMd] = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

	const [leftRef, { width: leftWidth }] = useElementSize();
	const [rightRef, { width: rightWidth }] = useElementSize();

	const [containerRef, { width: containerWidth, height: containerHeight }] = useElementSize();
	const [actionsRef, { width: actionsWidth }] = useElementSize();

	const {
		renderTitle,
		renderSubtitle,
		renderLeftPanel,
		renderRightPanel,
		actions,
		direction,
		p = 2,
		spacing = 2,
		...rest
	} = props;

	const handleStackWidth = useCallback(() => {
		const spacingWidth = convertREMToPixels(convertStringToNumber(theme.space[spacing as Space], 'rem'));

		return `calc(100% - ${
			(renderLeftPanel ? leftWidth + spacingWidth : 0) + (renderRightPanel ? rightWidth + spacingWidth : 0)
		}px)`;
	}, [theme, spacing, renderLeftPanel, leftWidth, renderRightPanel, rightWidth]);

	return (
		<HStack {...rest} width='100%' p={p} spacing={spacing}>
			{renderLeftPanel && !isMd && (
				<Center ref={leftRef}>{renderLeftPanel({ width: containerWidth, height: containerHeight })}</Center>
			)}

			<Stack
				{...rest}
				ref={containerRef}
				width={handleStackWidth()}
				direction={direction ? direction : isSm ? 'column' : 'row'}
				alignItems='center'
				justifyContent='space-between'
				spacing={spacing}
			>
				<VStack
					width={isSm ? '100%' : `calc(100% - ${actions ? actionsWidth + 48 : 0}px)`}
					alignItems='flex-start'
					spacing={0.5}
				>
					<Breadcrumbs />

					{/* Title */}
					{renderTitle &&
						renderTitle({
							align: 'left',
							color: getColor({ theme, colorMode, type: 'text.primary' }),
							fontSize: ['xl', '2xl', '3xl', '3xl', '4xl', '4xl'],
							fontWeight: 'bold',
							lineHeight: 'normal',
							noOfLines: 1
						})}

					{/* Subtitle */}
					{renderSubtitle &&
						renderSubtitle({
							align: 'left',
							color: getColor({ theme, colorMode, type: 'text.secondary' }),
							fontSize: ['xs', 'xs', 'sm', 'sm', 'sm', 'sm'],
							lineHeight: 'normal',
							noOfLines: 1
						})}
				</VStack>

				{actions && (
					<Center ref={actionsRef} width={direction ? 'auto' : isSm ? '100%' : 'auto'} height='100%'>
						{actions}
					</Center>
				)}
			</Stack>

			{renderRightPanel && !isMd && (
				<Center ref={rightRef}>{renderRightPanel({ width: containerWidth, height: containerHeight })}</Center>
			)}
		</HStack>
	);
};

export default PageHeader;
