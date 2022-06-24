import { ReactElement } from 'react';

import { Button, Icon } from '@davidscicluna/component-library';

import { useMediaQuery, HStack } from '@chakra-ui/react';

import { useSelector } from '../../../../common/hooks';
import Bookmark from '../../../../components/Clickable/Bookmark';
import Like from '../../../../components/Clickable/Like';
import { defaultUser, getUser } from '../../../../store/slices/Users';

import { ActionsProps } from './types';

const Actions = (props: ActionsProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const { mediaItem, mediaType, title, isLoading = true, isError = false } = props;

	return (
		<HStack width={isSm ? '100%' : 'auto'} spacing={2}>
			{mediaType === 'movie' || mediaType === 'tv' ? (
				<Bookmark
					renderAction={({ lists, isDisabled: isDisabledProp, isBookmarked, onClick }) => {
						const isDisabled: boolean = isDisabledProp || isError || isLoading || !mediaItem;

						return (
							<Button
								color={isBookmarked ? color : 'gray'}
								isFullWidth={isSm}
								isDisabled={isDisabled}
								onClick={() => onClick()}
								variant='outlined'
							>
								{isBookmarked
									? `In ${
											lists && (lists?.length || 0) === 1
												? `${lists[0].label ? `"${lists[0].label}" list` : ''}`
												: 'lists'
									  }`
									: 'Add to a list'}
							</Button>
						);
					}}
					title={title || ''}
					mediaType={mediaType === 'movie' ? 'movie' : 'tv'}
					mediaItem={mediaItem ? { ...mediaItem } : undefined}
				/>
			) : null}
			<Like
				renderAction={({ iconType, iconCategory, isDisabled: isDisabledProp, isLiked, onClick }) => {
					const isDisabled: boolean = isDisabledProp || isError || isLoading || !mediaItem;

					return (
						<Button
							color={isLiked ? 'red' : 'gray'}
							renderLeft={(props) => <Icon {...props} icon={iconType} category={iconCategory} />}
							isFullWidth={isSm}
							isDisabled={isDisabled}
							onClick={() => onClick()}
							variant='outlined'
						>
							{isLiked ? 'Liked' : 'Like'}
						</Button>
					);
				}}
				mediaType={mediaType === 'movie' ? 'movie' : mediaType === 'tv' ? 'tv' : 'person'}
				mediaItem={mediaItem ? { ...mediaItem } : undefined}
			/>
		</HStack>
	);
};

export default Actions;
