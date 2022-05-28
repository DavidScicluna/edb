import { ReactElement } from 'react';

import { Space, FontSize } from '@davidscicluna/component-library';

import { ColorMode, useTheme, useColorMode, VStack, Center, Image, Text, Fade } from '@chakra-ui/react';
import merge from 'lodash/merge';

import * as fallback from '../../common/assets/fallback';
import * as empty from '../../common/assets/illustrations/empty';
import { useSelector } from '../../common/hooks';
import { defaultUser, getUser } from '../../store/slices/Users';

import { EmptyProps } from './types';
import useStyles from './styles';

const Empty = (props: EmptyProps): ReactElement => {
	const theme = useTheme();
	const { colorMode: colorModeHook } = useColorMode();

	const userThemeColor = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const {
		button = undefined,
		color = 'gray',
		colorMode: colorModeProp,
		label,
		description,
		hasIllustration = true,
		size = 'md',
		variant = 'outlined'
	} = props;

	const colorMode: ColorMode = colorModeProp || colorModeHook;

	const style = useStyles(theme, { color });

	/**
	 * This method will return the appropriate padding depending on the size passed
	 *
	 * @returns - number: Padding value
	 */
	const handleReturnPadding = (): Space => {
		switch (size) {
			case 'xs':
				return 1;
			case 'sm':
				return 2;
			case 'lg':
				return 4;
			case 'xl':
				return 6;
			default:
				return 3;
		}
	};

	/**
	 * This method will return the appropriate spacing depending on the size passed
	 *
	 * @returns - number: Spacing value
	 */
	const handleReturnSpacing = (): Space => {
		switch (size) {
			case 'xs':
				return 0.5;
			case 'sm':
				return 1;
			case 'lg':
				return 2;
			case 'xl':
				return 3;
			default:
				return 1.5;
		}
	};

	/**
	 * This method will return the appropriate width size of the Illustration depending on the size passed
	 *
	 * @returns - number: Spacing value
	 */
	const handleReturnIllustrationWidth = (): number => {
		switch (size) {
			case 'xs':
				return 50;
			case 'sm':
				return 45;
			case 'lg':
				return 35;
			case 'xl':
				return 30;
			default:
				return 40;
		}
	};

	/**
	 * This method will return the appropriate font size of the label depending on the size passed
	 *
	 * @returns - number: Spacing value
	 */
	const handleReturnLabelFontSize = (): FontSize => {
		switch (size) {
			case 'xs':
				return 'sm';
			case 'sm':
				return 'md';
			case 'lg':
				return 'xl';
			case 'xl':
				return '2xl';
			default:
				return 'lg';
		}
	};

	/**
	 * This method will return the appropriate font size of the description depending on the size passed
	 *
	 * @returns - number: Spacing value
	 */
	const handleReturnDescriptionFontSize = (): FontSize => {
		switch (size) {
			case 'xs':
				return 'xs';
			case 'sm':
				return 'sm';
			case 'lg':
				return 'md';
			case 'xl':
				return 'lg';
			default:
				return 'sm';
		}
	};

	return (
		<Fade in style={{ width: '100%' }}>
			<VStack
				width='100%'
				spacing={handleReturnSpacing()}
				p={handleReturnPadding()}
				sx={{ ...merge(style.empty[variant], style[colorMode][variant]) }}
			>
				{hasIllustration ? (
					<Center maxWidth={`${handleReturnIllustrationWidth()}%`}>
						<Image
							alt='Empty illustration'
							src={empty.default[userThemeColor]}
							fallbackSrc={colorMode === 'light' ? fallback.default.light : fallback.default.dark}
						/>
					</Center>
				) : null}
				<VStack spacing={0}>
					<Text
						align='center'
						fontSize={handleReturnLabelFontSize()}
						fontWeight='semibold'
						color={`${color}.${
							color === 'gray' ? (colorMode === 'light' ? 900 : 50) : colorMode === 'light' ? 500 : 400
						}`}
					>
						{label}
					</Text>
					{description ? (
						<Text
							align='center'
							fontSize={handleReturnDescriptionFontSize()}
							color={`gray.${colorMode === 'light' ? 400 : 500}`}
						>
							{description}
						</Text>
					) : null}
				</VStack>

				{button ? <Center width='100%'>{button}</Center> : null}
			</VStack>
		</Fade>
	);
};

export default Empty;
