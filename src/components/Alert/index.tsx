import { FC, useState, useCallback, useEffect } from 'react';

import {
	Space,
	useTheme,
	IconButton,
	IconButtonIcon,
	Icon,
	utils,
	Undefinable
} from '@davidscicluna/component-library';

import { useConst, HStack, VStack, Center, Progress, Text } from '@chakra-ui/react';

import { useCountdown, useElementSize, useUpdateEffect } from 'usehooks-ts';
import { round, sample } from 'lodash';
import { transparentize } from 'color2k';

import { errorTitles, errorEmojis, successTitles, successEmojis } from '../../common/data/strings';
import { useUserTheme } from '../../common/hooks';

import { duration as defaultDuration } from './common/data/defaultPropValues';
import { AlertProps } from './types';
import { getStatusColor, getStatusIcon } from './common/utils';

const { convertREMToPixels, convertStringToNumber, getColor } = utils;

const spacing: Space = 2;

const Alert: FC<AlertProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [contentRef, { height: contentHeight }] = useElementSize();
	const [closeRef, { width: closeWidth }] = useElementSize();

	const { duration, title, description, onClose, status } = props;

	const sampledTitle = useConst<Undefinable<string>>(
		status === 'error'
			? sample(errorTitles) || errorTitles[0]
			: status === 'success'
			? sample(successTitles) || successTitles[0]
			: undefined
	);
	const sampledEmoji = useConst<Undefinable<string>>(
		status === 'error'
			? sample(errorEmojis) || errorEmojis[0]
			: status === 'success'
			? sample(successEmojis) || successEmojis[0]
			: undefined
	);

	const defaultTitle = useConst<Undefinable<string>>(
		status === 'error'
			? `${sampledTitle}, something went wrong! ${sampledEmoji}`
			: status === 'success'
			? `${sampledTitle}! ${sampledEmoji}`
			: undefined
	);

	const [count, { startCountdown, resetCountdown }] = useCountdown({
		countStart: duration || defaultDuration,
		intervalMs: 1000
	});

	const [color, setColor] = useState<string>(
		getColor({ theme, colorMode, color: getStatusColor({ status }), type: 'color' })
	);
	const [background, setBackground] = useState<string>(getColor({ theme, colorMode, type: 'background' }));

	const handleProgressLeft = useCallback(() => {
		const height = convertREMToPixels(convertStringToNumber(theme.space['0.5'], 'rem')) / 2;
		const width = contentHeight / 2;

		return `-${width + height}px`;
	}, [theme, contentHeight]);

	const handleContentWidth = useCallback(() => {
		const spacingWidth = convertREMToPixels(convertStringToNumber(theme.space[spacing], 'rem'));

		return `calc(100% - ${onClose ? closeWidth + spacingWidth : 0}px)`;
	}, [theme, closeWidth, spacing]);

	useUpdateEffect(() => {
		setBackground(getColor({ theme, colorMode, type: 'background' }));
	}, [colorMode]);

	useUpdateEffect(() => {
		setColor(getColor({ theme, colorMode, color: getStatusColor({ status }), type: 'color' }));
	}, [status, colorMode]);

	useEffect(() => {
		if (duration) {
			startCountdown();
		}

		return () => {
			setTimeout(() => resetCountdown(), 0);
		};
	}, []);

	return (
		<HStack
			minWidth={theme.fontSizes['9xl']}
			alignItems='center'
			justifyContent='space-between'
			boxShadow={`0px 5px 20px 0px ${transparentize(background, 0.5)}`}
			borderRadius='lg'
			borderWidth='2px'
			borderStyle='solid'
			borderColor={getColor({ theme, colorMode, type: 'divider' })}
			background={background}
			spacing={spacing}
			py={spacing}
			px={spacing}
		>
			<HStack width={handleContentWidth()} position='relative' spacing={spacing}>
				<Center position='absolute' left={handleProgressLeft()}>
					<Progress
						width={`${contentHeight}px`}
						height={theme.space['0.5']}
						borderRadius='full'
						background={getColor({ theme, colorMode, type: 'divider' })}
						value={duration ? round((count / duration) * 100) : 100}
						sx={{
							'transform': 'rotate(-90deg)',
							'& div': { backgroundImage: 'none', backgroundColor: color }
						}}
					/>
				</Center>

				<Icon
					width={theme.fontSizes['4xl']}
					height={theme.fontSizes['4xl']}
					fontSize={theme.fontSizes['4xl']}
					icon={getStatusIcon({ status })}
					color={color}
				/>

				<VStack ref={contentRef} alignItems='flex-start' justifyContent='center' spacing={0.5}>
					<Text
						align='left'
						color={getColor({ theme, colorMode, type: 'text.primary' })}
						fontSize='xl'
						fontWeight='bold'
						lineHeight='shorter'
						whiteSpace='nowrap'
					>
						{title || defaultTitle}
					</Text>

					<Text
						align='left'
						color={getColor({ theme, colorMode, type: 'text.secondary' })}
						fontSize='sm'
						lineHeight='shorter'
					>
						{description}
					</Text>
				</VStack>
			</HStack>

			{duration && onClose && (
				<Center ref={closeRef}>
					<IconButton
						aria-label='Alert Close Button'
						colorMode={colorMode}
						onClick={() => onClose()}
						variant='icon'
					>
						<IconButtonIcon icon='close' />
					</IconButton>
				</Center>
			)}
		</HStack>
	);
};

export default Alert;
