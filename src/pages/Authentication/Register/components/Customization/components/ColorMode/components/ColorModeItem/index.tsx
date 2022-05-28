import { ReactElement } from 'react';

import { useTheme } from '@davidscicluna/component-library';

import { Text, HStack } from '@chakra-ui/react';

import Card from '../../../../../../../../../components/Clickable/Card';

import { ColorModeItemProps } from './types';

const ColorModeItem = (props: ColorModeItemProps): ReactElement => {
	const theme = useTheme();

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
