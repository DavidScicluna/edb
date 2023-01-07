import { FC, useRef } from 'react';

import { Nullable, useTheme, Headline, Button, Badge, BadgeLabel, Icon, utils } from '@davidscicluna/component-library';

import { useMediaQuery, Stack, HStack, Text } from '@chakra-ui/react';

import { useCountUp } from 'react-countup';
import { useEffectOnce, useElementSize, useUpdateEffect } from 'usehooks-ts';
import { memoize } from 'lodash';
import numbro from 'numbro';

import { useUserTheme } from '../../../../../../../../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../../../../../../../../containers/Layout/common/hooks';
import { formatMediaTypeLabel } from '../../../../../../../../../../../../../common/utils';

import { MyListsTabListTabHeadlineProps } from './types';

const { convertREMToPixels, convertStringToNumber } = utils;

const MyListsTabListTabHeadline: FC<MyListsTabListTabHeadlineProps> = (props) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const countUpRef = useRef<Nullable<HTMLParagraphElement>>(null);

	const { spacing } = useLayoutContext();

	const [actionsRef, { width: actionsWidth }] = useElementSize();

	const { list, mediaType, onEditList, onDeleteList } = props;
	const { id, label = '', description, mediaItems } = list || {};

	const total = (mediaItems?.movie.length || 0) + (mediaItems?.tv.length || 0);

	// TODO: Maybe replace this logic with TotalBadge
	const { start, update } = useCountUp({
		ref: countUpRef,
		start: 0,
		end: total,
		delay: convertStringToNumber(theme.transition.duration.slower, 'ms') / 1000,
		duration: convertStringToNumber(theme.transition.duration.slower, 'ms') / 1000,
		formattingFn: memoize((end): string =>
			mediaType
				? `Total of ${numbro(end).format({ average: true })} ${formatMediaTypeLabel({
						type: total === 1 ? 'single' : 'multiple',
						mediaType
				  })} in "${label}" list`
				: `Total of ${numbro(end).format({ average: true })} bookmarks in "${label}" list`
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
				renderTitle={(props) => <Text {...props}>{label || ''}</Text>}
				renderSubtitle={description ? (props) => <Text {...props}>{description}</Text> : undefined}
			/>

			{id !== 'ds-edb-user-lists-watchlist' && (
				<HStack ref={actionsRef} width={isSm ? '100%' : 'auto'} height='100%' spacing={spacing / 2}>
					<Button
						color={color}
						colorMode={colorMode}
						renderLeft={({ color, colorMode, height }) => (
							<Icon
								width={`${height}px`}
								height={`${height}px`}
								fontSize={`${height}px`}
								colorMode={colorMode}
								icon='edit'
								category='outlined'
								skeletonColor={color}
							/>
						)}
						onClick={() => onEditList()}
						variant='outlined'
					>
						Edit
					</Button>

					<Button
						color='red'
						colorMode={colorMode}
						renderLeft={({ color, colorMode, height }) => (
							<Icon
								width={`${height}px`}
								height={`${height}px`}
								fontSize={`${height}px`}
								colorMode={colorMode}
								icon='delete_outline'
								category='outlined'
								skeletonColor={color}
							/>
						)}
						onClick={() => onDeleteList()}
						variant='outlined'
					>
						Delete
					</Button>
				</HStack>
			)}
		</Stack>
	);
};

export default MyListsTabListTabHeadline;
