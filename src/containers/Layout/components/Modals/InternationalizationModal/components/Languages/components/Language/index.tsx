import { FC } from 'react';

import { useTheme, Card, CardHeader, Icon, ScaleFade, utils } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../../common/hooks';

import { LanguageProps } from './types';

const { getColor } = utils;

const Language: FC<LanguageProps> = (props) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { language, isActive, ...rest } = props;

	return (
		<Card
			{...rest}
			color={isActive ? color : 'gray'}
			colorMode={colorMode}
			isLight={!isActive}
			isClickable
			isFullWidth
			p={2}
		>
			<CardHeader
				renderTitle={(props) => (
					<Text {...props} fontSize='md' fontWeight='medium'>
						{language.name}
					</Text>
				)}
				renderSubtitle={(props) => (
					<Text {...props} fontSize='md' fontWeight='medium'>
						{language.english_name}
					</Text>
				)}
				actions={
					<ScaleFade in={isActive} unmountOnExit={false}>
						<Icon icon='check' color={getColor({ theme, colorMode, color, type: 'color' })} />
					</ScaleFade>
				}
			/>
		</Card>
	);
};

export default Language;
