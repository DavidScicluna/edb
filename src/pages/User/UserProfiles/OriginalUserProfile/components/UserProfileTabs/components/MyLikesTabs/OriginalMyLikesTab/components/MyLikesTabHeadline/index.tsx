import { FC, useRef } from 'react';

import {
	Nullable,
	useTheme,
	ConfirmModal,
	ConfirmModalStack,
	ConfirmModalIcon,
	ConfirmModalTitle,
	ConfirmModalSubtitle,
	ConfirmModalBody,
	ConfirmModalFooter,
	Button,
	IconButton,
	IconButtonIcon,
	Badge,
	BadgeLabel,
	Icon,
	utils
} from '@davidscicluna/component-library';

import { useMediaQuery, useDisclosure, Stack, Center, Text } from '@chakra-ui/react';

import { useCountUp } from 'react-countup';
import { useEffectOnce, useElementSize, useUpdateEffect } from 'usehooks-ts';
import { memoize } from 'lodash';
import numbro from 'numbro';
import { useDispatch } from 'react-redux';

import { Headline } from '../../../../../../../../../../../components';
import { useSelector, useUserTheme } from '../../../../../../../../../../../common/hooks';
import { formatMediaTypeLabel } from '../../../../../../../../../../../common/utils';
import { useLayoutContext } from '../../../../../../../../../../../containers/Layout/common/hooks';
import { setUserLiked } from '../../../../../../../../../../../store/slices/Users';

import { MyLikesTabHeadlineProps } from './types';

const { convertREMToPixels, convertStringToNumber } = utils;

const MyLikesTabHeadline: FC<MyLikesTabHeadlineProps> = ({ mediaType }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const countUpRef = useRef<Nullable<HTMLParagraphElement>>(null);

	const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure();

	const { spacing } = useLayoutContext();

	const [actionsRef, { width: actionsWidth }] = useElementSize();

	const dispatch = useDispatch();
	const id = useSelector((state) => state.users.data.activeUser.data.id);
	const total = useSelector(
		(state) =>
			state.users.data.activeUser.data.liked.movie.length +
				state.users.data.activeUser.data.liked.tv.length +
				state.users.data.activeUser.data.liked.person.length +
				state.users.data.activeUser.data.liked.company.length +
				state.users.data.activeUser.data.liked.collection.length || 0
	);

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
				  })} liked`
				: `Total of ${numbro(end).format({ average: true })} likes`
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
		<>
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
					renderTitle={(props) => <Text {...props}>My Likes</Text>}
					renderSubtitle={(props) => (
						<Text {...props}>
							This Tab contains all likes that have been added to the likes list and all are separated
							into their respective tab depending on the media type.
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
								icon='clear'
								category='outlined'
								skeletonColor={color}
							/>
						)}
						isDisabled={total === 0}
						isFullWidth
						onClick={() => onConfirmOpen()}
						variant='outlined'
					>
						Clear
					</Button>
				</Center>
			</Stack>

			{total > 0 && (
				<ConfirmModal
					colorMode={colorMode}
					renderCancel={({ icon, category, ...rest }) => (
						<IconButton {...rest}>
							<IconButtonIcon icon={icon} category={category} />
						</IconButton>
					)}
					isOpen={isConfirmOpen}
					onClose={onConfirmClose}
				>
					<ConfirmModalStack spacing={spacing} p={spacing}>
						<ConfirmModalIcon
							renderIcon={(props) => (
								<Icon
									{...props}
									width={theme.fontSizes['6xl']}
									height={theme.fontSizes['6xl']}
									fontSize={theme.fontSizes['6xl']}
									icon='clear'
									category='outlined'
								/>
							)}
							color='red'
							p={2}
						/>

						<ConfirmModalBody>
							<ConfirmModalTitle>Clear All Likes?</ConfirmModalTitle>
							<ConfirmModalSubtitle>
								{`Are you sure you want to clear all ${total} likes? This action is irreversible!`}
							</ConfirmModalSubtitle>
						</ConfirmModalBody>
						<ConfirmModalFooter
							renderCancel={(props) => <Button {...props}>Cancel</Button>}
							renderAction={(props) => (
								<Button
									{...props}
									color='red'
									onClick={() =>
										dispatch(
											setUserLiked({
												id,
												data: { movie: [], tv: [], person: [], company: [], collection: [] }
											})
										)
									}
								>
									Clear
								</Button>
							)}
						/>
					</ConfirmModalStack>
				</ConfirmModal>
			)}
		</>
	);
};

export default MyLikesTabHeadline;
