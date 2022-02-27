import { ReactElement } from 'react';

import { useMediaQuery, HStack } from '@chakra-ui/react';

import { ActionsProps } from './types';

import { useSelector } from '../../../../common/hooks';
import Bookmark from '../../../../components/Clickable/Bookmark';
import Button from '../../../../components/Clickable/Button';
import Like, { handleReturnIcon } from '../../../../components/Clickable/Like';

const Actions = (props: ActionsProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector((state) => state.user.ui.theme.color);

	const { mediaItem, mediaType, title, isLoading = true, isError = false } = props;

	const isDisabled: boolean = isError || isLoading || !mediaItem;

	return (
		<HStack width={isSm ? '100%' : 'auto'} spacing={2}>
			{mediaType === 'movie' || mediaType === 'tv' ? (
				<Bookmark
					renderButton={({ lists, isBookmarked, onClick }) => (
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
					)}
					title={title || ''}
					mediaType={mediaType === 'movie' ? 'movie' : 'tv'}
					mediaItem={mediaItem ? { ...mediaItem } : undefined}
				/>
			) : null}
			<Like
				renderButton={({ isLiked, onClick }) => (
					<Button
						color={isLiked ? 'red' : 'gray'}
						renderLeft={({ fontSize }) => handleReturnIcon(isLiked, fontSize)}
						isFullWidth={isSm}
						isDisabled={isDisabled}
						onClick={() => onClick()}
						variant='outlined'
					>
						{isLiked ? 'Liked' : 'Like'}
					</Button>
				)}
				mediaType={mediaType === 'movie' ? 'movie' : mediaType === 'tv' ? 'tv' : 'person'}
				mediaItem={mediaItem ? { ...mediaItem } : undefined}
			/>
		</HStack>
	);
};

export default Actions;
