import { ReactElement } from 'react';

import { useTheme, Text, HStack } from '@chakra-ui/react';

import { ColorModeItemProps } from './types';

import Card from '../../../../../../../../components/Clickable/Card';
import { Theme } from '../../../../../../../../theme/types';

const ColorModeItem = (props: ColorModeItemProps): ReactElement => {
	const theme = useTheme<Theme>();

	const { renderLeft, label, value, color, colorMode, isActive = false, onClick } = props;

	return (
		<Card
			color={isActive ? color : 'gray'}
			colorMode={colorMode}
			isClickable
			isFullWidth
			onClick={onClick ? () => onClick(value) : undefined}
			p={2}
		>
			<HStack width='100%' justifyContent='center' spacing={1}>
				{renderLeft({ isActive, fontSize: theme.fontSizes.xl })}
				<Text align='center' fontSize='xl' fontWeight='semibold' textTransform='uppercase'>
					{label}
				</Text>
			</HStack>
		</Card>
	);
};

export default ColorModeItem;
