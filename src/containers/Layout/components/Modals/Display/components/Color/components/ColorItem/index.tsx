import { ReactElement } from 'react';

import { useTheme, useBoolean, useConst, VStack, Box, Center, Text, ScaleFade } from '@chakra-ui/react';

import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import _ from 'lodash';

import { ColorItemProps } from './types';

import Card from '../../../../../../../../../components/Clickable/Card';
import Tooltip from '../../../../../../../../../components/Tooltip';
import { Theme } from '../../../../../../../../../theme/types';

const ColorItem = (props: ColorItemProps): ReactElement => {
	const theme = useTheme<Theme>();

	const { color, colorMode, isActive, onClick } = props;

	const [isMouseDown, setIsMouseDown] = useBoolean();
	const [isHovering, setIsHovering] = useBoolean();

	const label = useConst<string>(_.startCase(color));

	return (
		<Tooltip
			aria-label={isActive ? `Current color: ${label}` : `Set color to ${label}`}
			colorMode={colorMode}
			isOpen={isHovering}
			isDisabled={isActive}
			label={isActive ? `Current color: ${label}` : `Set color to ${label}`}
			placement='top'
			shouldWrapChildren
			gutter={isMouseDown ? 8 : 11}
		>
			<Card
				color={isActive ? color : 'gray'}
				colorMode={colorMode}
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

							backgroundColor: `${color}.400`,
							borderRadius: 'full'
						}}
					>
						<ScaleFade in={isActive} unmountOnExit>
							<Center>
								<CheckOutlinedIcon
									style={{
										fontSize: theme.fontSizes['4xl'],
										color: theme.colors.gray[colorMode === 'light' ? 50 : 900]
									}}
								/>
							</Center>
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
