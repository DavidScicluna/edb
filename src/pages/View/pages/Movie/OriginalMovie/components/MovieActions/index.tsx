import { FC } from 'react';

import { Button, Icon } from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';

import { Bookmark, Like } from '../../../../../../../components';
import { useSelector, useUserTheme } from '../../../../../../../common/hooks';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';
import ViewActions from '../../../../../components/ViewActions';

import { MovieActionsProps, MovieActionsMouseEvent } from './types';

const MovieActions: FC<MovieActionsProps> = ({ movie, ...rest }) => {
	const { color, colorMode } = useUserTheme();

	const { mediaItem, isOpen } = useSelector((state) => state.modals.ui.bookmarkModal);

	const { id, title = '' } = movie;

	const [isHovering, setIsHovering] = useBoolean();

	return (
		<ViewActions {...rest}>
			<Like<'movie'>
				renderAction={({ iconType, iconCategory, isDisabled, isLiked, onClick }) => (
					<Button
						color={isLiked ? 'red' : 'gray'}
						colorMode={colorMode}
						renderLeft={() => <Icon icon={iconType} category={iconCategory} />}
						isDisabled={isDisabled || !movie}
						isFullWidth
						onClick={(event: MovieActionsMouseEvent) => {
							event.preventDefault();
							event.stopPropagation();

							onClick();
						}}
						size='lg'
						variant='outlined'
					>
						{isLiked
							? `Dislike ${formatMediaTypeLabel({ type: 'single', mediaType: 'movie' })}`
							: `Like ${formatMediaTypeLabel({ type: 'single', mediaType: 'movie' })}`}
					</Button>
				)}
				title={title}
				mediaType='movie'
				mediaItem={movie}
			/>
			<Bookmark<'movie'>
				renderAction={({ iconType, iconCategory, isDisabled, isBookmarked, isBookmarkedMultiple, onClick }) => (
					<Button
						color={
							(isOpen && mediaItem?.id === id) || isBookmarked || isBookmarkedMultiple ? color : 'gray'
						}
						colorMode={colorMode}
						renderLeft={() => <Icon icon={iconType} category={iconCategory} />}
						isDisabled={isDisabled}
						isFullWidth
						onClick={(event: MovieActionsMouseEvent) => {
							event.preventDefault();
							event.stopPropagation();

							onClick();
						}}
						onMouseEnter={() => setIsHovering.on()}
						onMouseLeave={() => setIsHovering.off()}
						size='lg'
						variant='outlined'
					>
						{isBookmarked
							? `Remove ${formatMediaTypeLabel({ type: 'single', mediaType: 'movie' })} from ${
									isBookmarkedMultiple ? 'lists' : 'list'
							  }`
							: `Add ${formatMediaTypeLabel({ type: 'single', mediaType: 'movie' })} to a list`}
					</Button>
				)}
				title={title}
				mediaType='movie'
				mediaItem={movie}
				isHovering={isHovering}
			/>
		</ViewActions>
	);
};

export default MovieActions;
