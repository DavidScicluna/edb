import { ReactElement } from 'react';

import { useTheme, useBoolean, useConst, VStack, Box, Text, ScaleFade } from '@chakra-ui/react';

import startCase from 'lodash/startCase';

import { ColorItemProps } from './types';

import Card from '../../../../../../../../../components/Clickable/Card';
import Icon from '../../../../../../../../../components/Icon';
import Tooltip from '../../../../../../../../../components/Tooltip';
import { Theme } from '../../../../../../../../../theme/types';

const ColorItem = (props: ColorItemProps): ReactElement => {
	const theme = useTheme<Theme>();

	const { color, colorMode, isActive, onClick } = props;

	const [isMouseDown, setIsMouseDown] = useBoolean();
	const [isHovering, setIsHovering] = useBoolean();

	const label = useConst<string>(startCase(color));

	return (
		<Tooltip
			aria-label={isActive ? `Current color: ${label}` : `Set color to ${label}`}
			colorMode={colorMode}
			label={isActive ? `Current color: ${label}` : `Set color to ${label}`}
			isOpen={!isActive && isHovering}
			isDisabled={isActive}
			placement='top'
			shouldWrapChildren
			gutter={isMouseDown ? 8 : 11}
		>
			<Card
				color={isActive ? color : 'gray'}
				colorMode={colorMode}
				isFullWidth
				isClickable
				onClick={!isActive && onClick ? () => onClick(color) : undefined}
				onMouseDown={() => setIsMouseDown.on()}
				onMouseUp={() => setIsMouseDown.off()}
				onMouseEnter={() => setIsHovering.on()}
				onMouseLeave={() => setIsHovering.off()}
				p={2}
			>
				<VStack width='100%' spacing={0.75}>
					<Box
						sx={{
							width: theme.fontSizes['6xl'],
							height: theme.fontSizes['6xl'],

							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',

							backgroundColor: `${color}.${colorMode === 'light' ? 500 : 400}`,
							borderRadius: 'full'
						}}
					>
						<ScaleFade in={isActive} unmountOnExit>
							<Icon
								icon='check'
								type='outlined'
								color={theme.colors.gray[colorMode === 'light' ? 50 : 900]}
								fontSize={theme.fontSizes['4xl']}
							/>
						</ScaleFade>
					</Box>
					<Text align='center' fontSize='sm' fontWeight='medium'>
						{label}
					</Text>
				</VStack>
			</Card>
		</Tooltip>
	);
};

export default ColorItem;
