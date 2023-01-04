import { FC } from 'react';

import { Space, useTheme, Headline, utils } from '@davidscicluna/component-library';

import { useMediaQuery, Center, Stack, HStack } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import Breadcrumbs from './components/Breadcrumbs';
import { PageHeaderProps } from './types';

const { convertREMToPixels, convertStringToNumber } = utils;

const PageHeader: FC<PageHeaderProps> = (props) => {
	const theme = useTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

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
		spacing = 2,
		...rest
	} = props;

	const handleStackWidth = (): string => {
		const spacingWidth = convertREMToPixels(convertStringToNumber(theme.space[spacing as Space], 'rem'));

		return `calc(100% - ${
			(renderLeftPanel && !isSm ? leftWidth + spacingWidth : 0) +
			(renderRightPanel && !isSm ? rightWidth + spacingWidth : 0)
		}px)`;
	};

	const handleHeadlineWidth = (): string => {
		const spacingWidth = convertREMToPixels(convertStringToNumber(theme.space[spacing as Space], 'rem'));

		return direction === 'column' || isSm ? '100%' : `calc(100% - ${actions ? actionsWidth + spacingWidth : 0}px)`;
	};

	return (
		<HStack {...rest} width='100%' spacing={spacing}>
			{renderLeftPanel && !isSm && (
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
				p={0}
			>
				<Headline
					width={handleHeadlineWidth()}
					renderCaption={() => <Breadcrumbs />}
					renderTitle={(props) => renderTitle({ ...props, noOfLines: 0 })}
					renderSubtitle={renderSubtitle ? (props) => renderSubtitle({ ...props, noOfLines: 1 }) : undefined}
					spacing={0.5}
				/>

				{actions && (
					<Center ref={actionsRef} width={direction === 'column' || isSm ? '100%' : 'auto'} height='100%'>
						{actions}
					</Center>
				)}
			</Stack>

			{renderRightPanel && !isSm && (
				<Center ref={rightRef}>{renderRightPanel({ width: containerWidth, height: containerHeight })}</Center>
			)}
		</HStack>
	);
};

export default PageHeader;
