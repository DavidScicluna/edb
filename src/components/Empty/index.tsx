import { ReactElement } from 'react';

import { useTheme, useColorMode, VStack, Center, AspectRatio, Image, Text, Fade } from '@chakra-ui/react';

import _ from 'lodash';

import useStyles from './styles';
import { EmptyProps } from './types';

import * as fallback from '../../common/assets/fallback';
import * as empty from '../../common/assets/illustrations/empty';
import { useSelector } from '../../common/hooks';
import { handleReturnRatio } from '../../common/utils';
import { Theme, Space, FontSizes } from '../../theme/types';

const Empty = (props: EmptyProps): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode } = useColorMode();

	const {
		button = undefined,
		color = 'gray',
		label,
		description,
		hasIllustration = true,
		size = 'md',
		variant = 'outlined'
	} = props;

	const userThemeColor = useSelector((state) => state.user.ui.theme.color);

	const style = useStyles(theme, { color });

	/**
	 * This method will return the appropriate padding depending on the size passed
	 *
	 * @returns - number: Padding value
	 */
	const handleReturnPadding = (): keyof Space => {
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
	const handleReturnSpacing = (): keyof Space => {
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
	 * This method will return the appropriate Illustration depending on the color selected
	 * @returns Illustration path
	 */
	const handleReturnIllustration = (): string => {
		switch (color === 'gray' ? userThemeColor : color) {
			case 'blue':
				return empty.default.blue;
			case 'cyan':
				return empty.default.cyan;
			case 'green':
				return empty.default.green;
			case 'orange':
				return empty.default.orange;
			case 'pink':
				return empty.default.pink;
			case 'purple':
				return empty.default.purple;
			case 'teal':
				return empty.default.teal;
			case 'yellow':
				return empty.default.yellow;
			default:
				return '';
		}
	};

	/**
	 * This method will return the appropriate font size of the label depending on the size passed
	 *
	 * @returns - number: Spacing value
	 */
	const handleReturnLabelFontSize = (): keyof FontSizes => {
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
	const handleReturnDescriptionFontSize = (): keyof FontSizes => {
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
				sx={{ ..._.merge(style.empty[variant], style[colorMode][variant]) }}
			>
				{hasIllustration ? (
					<AspectRatio
						maxWidth={`${handleReturnIllustrationWidth()}%`}
						ratio={handleReturnRatio('landscape')}
					>
						<Image
							alt='Empty illustration'
							src={handleReturnIllustration()}
							fallbackSrc={colorMode === 'light' ? fallback.default.light : fallback.default.dark}
						/>
					</AspectRatio>
				) : null}
				<VStack spacing={0}>
					<Text
						align='center'
						fontSize={handleReturnLabelFontSize()}
						fontWeight='semibold'
						color={
							colorMode === 'light'
								? color === 'gray'
									? 'gray.900'
									: `${color}.500`
								: color === 'gray'
								? 'gray.50'
								: `${color}.400`
						}
					>
						{label}
					</Text>
					{description ? (
						<Text
							align='center'
							fontSize={handleReturnDescriptionFontSize()}
							color={
								colorMode === 'light'
									? color === 'gray'
										? 'gray.500'
										: `${color}.300`
									: color === 'gray'
									? 'gray.50'
									: `${color}.600`
							}
						>
							{description}
						</Text>
					) : null}
				</VStack>

				{button ? <Center>{button}</Center> : null}
			</VStack>
		</Fade>
	);
};

export default Empty;
