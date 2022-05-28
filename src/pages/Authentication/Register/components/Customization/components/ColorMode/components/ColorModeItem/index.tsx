import { ReactElement } from 'react';

import { useTheme, Card, CardBody } from '@davidscicluna/component-library';

import { Text, HStack } from '@chakra-ui/react';

import { ColorModeItemProps } from './types';

const ColorModeItem = (props: ColorModeItemProps): ReactElement => {
	const theme = useTheme();

	const { renderLeft, label, value, colorMode, isActive = false, onClick } = props;

	return (
		<Card
			// color={isActive ? color : 'gray'}
			color={isActive ? 'blue' : 'gray'}
			colorMode={colorMode}
			isClickable
			isFullWidth
			onClick={onClick ? () => onClick(value) : undefined}
			p={2}
		>
			<CardBody>
				<HStack width='100%' justifyContent='center' spacing={1}>
					{renderLeft({ isActive, fontSize: theme.fontSizes.xl })}
					<Text align='center' fontSize='xl' fontWeight='semibold' textTransform='uppercase'>
						{label}
					</Text>
				</HStack>
			</CardBody>
		</Card>
	);
};

export default ColorModeItem;
