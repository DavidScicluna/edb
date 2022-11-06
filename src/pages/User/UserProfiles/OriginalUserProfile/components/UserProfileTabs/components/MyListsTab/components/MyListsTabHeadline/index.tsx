import { FC, useRef } from 'react';

import { Nullable, useTheme, Button, Badge, BadgeLabel, Icon, utils } from '@davidscicluna/component-library';

import { useMediaQuery, Stack, Center, Text } from '@chakra-ui/react';

import { useCountUp } from 'react-countup';
import { useEffectOnce, useElementSize, useUpdateEffect } from 'usehooks-ts';
import { memoize } from 'lodash';
import numbro from 'numbro';

import { Headline } from '../../../../../../../../../../components';
import { useSelector, useUserTheme } from '../../../../../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../../../../../containers/Layout/common/hooks';

import { MyListsTabHeadlineProps } from './types';

const { convertREMToPixels, convertStringToNumber } = utils;

const MyListsTabHeadline: FC<MyListsTabHeadlineProps> = ({ onCreateListOpen }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const countUpRef = useRef<Nullable<HTMLParagraphElement>>(null);

	const { spacing } = useLayoutContext();

	const [actionsRef, { width: actionsWidth }] = useElementSize();

	const total = useSelector((state) => state.users.data.activeUser.data.lists.length);

	const { start, update } = useCountUp({
		ref: countUpRef,
		start: 0,
		end: total,
		delay: convertStringToNumber(theme.transition.duration.slower, 'ms') / 1000,
		duration: convertStringToNumber(theme.transition.duration.slower, 'ms') / 1000,
		formattingFn: memoize(
			(end): string => `Total of ${numbro(end).format({ average: true })} ${total === 1 ? 'list' : 'lists'}`
		),
		startOnMount: false
	});

	const handleHeadlineWidth = (): string => {
		const spacingWidth = convertREMToPixels(convertStringToNumber(theme.space[spacing], 'rem'));

		return isSm ? '100%' : `calc(100% - ${actionsWidth + spacingWidth}px)`;
	};

	useEffectOnce(() => start());

	useUpdateEffect(() => update(total), [total]);

	return (
		<Stack
			width='100%'
			direction={isSm ? 'column' : 'row'}
			alignItems='center'
			justifyContent='space-between'
			spacing={spacing * 2}
			p={0}
		>
			<Headline
				width={handleHeadlineWidth()}
				renderCaption={() => (
					<Badge color={color} colorMode={colorMode} size='xs'>
						<BadgeLabel>
							<p ref={countUpRef} />
						</BadgeLabel>
					</Badge>
				)}
				renderTitle={(props) => <Text {...props}>My Lists</Text>}
				renderSubtitle={(props) => (
					<Text {...props}>
						This Tab contains all the lists that you have created and all the bookmarks that have been added
						to the list and all are separated into their respective tab depending on the media type.
					</Text>
				)}
			/>

			<Center ref={actionsRef} width={isSm ? '100%' : 'auto'} height='100%'>
				<Button
					colorMode={colorMode}
					renderLeft={({ color, colorMode, height }) => (
						<Icon
							width={`${height}px`}
							height={`${height}px`}
							fontSize={`${height}px`}
							colorMode={colorMode}
							icon='add'
							category='outlined'
							skeletonColor={color}
						/>
					)}
					isDisabled={total === 0}
					isFullWidth
					onClick={() => onCreateListOpen()}
					variant='outlined'
				>
					Create New List
				</Button>
			</Center>
		</Stack>
	);
};

export default MyListsTabHeadline;
