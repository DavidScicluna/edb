import { FC } from 'react';

import { ButtonMouseEvent, Button, Icon } from '@davidscicluna/component-library';

import { useBoolean, HStack } from '@chakra-ui/react';

import { useSelector, useUserTheme } from '../../../../../../../../../common/hooks';
import { Bookmark, Like } from '../../../../../../../../../components';
import spacing from '../../../../common/data/spacing';

import { QuickViewModalMovieActionsProps } from './types';

const QuickViewModalMovieActions: FC<QuickViewModalMovieActionsProps> = ({ movie }) => {
	const { color, colorMode } = useUserTheme();

	const { mediaItem, isOpen } = useSelector((state) => state.modals.ui.bookmarkModal);

	const { id, title = '' } = movie;

	const [isHovering, setIsHovering] = useBoolean();

	return (
		<HStack width='100%' spacing={spacing}>
			<Like<'movie'>
				renderAction={({ iconType, iconCategory, isDisabled, isLiked, onClick }) => (
					<Button
						color={isLiked ? 'red' : 'gray'}
						colorMode={colorMode}
						renderLeft={() => <Icon icon={iconType} category={iconCategory} />}
						isDisabled={isDisabled || !movie}
						isFullWidth
						onClick={(event: ButtonMouseEvent) => {
							event.preventDefault();
							event.stopPropagation();

							onClick();
						}}
						variant='outlined'
					>
						{isLiked ? 'Dislike' : 'Like'}
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
						onClick={(event: ButtonMouseEvent) => {
							event.preventDefault();
							event.stopPropagation();

							onClick();
						}}
						onMouseEnter={() => setIsHovering.on()}
						onMouseLeave={() => setIsHovering.off()}
						variant='outlined'
					>
						{isBookmarked ? `Remove from ${isBookmarkedMultiple ? 'lists' : 'list'}` : `Add to a list`}
					</Button>
				)}
				title={title}
				mediaType='movie'
				mediaItem={movie}
				isHovering={isHovering}
			/>
		</HStack>
	);
};

export default QuickViewModalMovieActions;
