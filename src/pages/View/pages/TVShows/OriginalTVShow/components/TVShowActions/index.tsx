import { FC } from 'react';

import { Button, Icon } from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';

import { Bookmark, Like } from '../../../../../../../components';
import { useSelector, useUserTheme } from '../../../../../../../common/hooks';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';
import ViewActions from '../../../../../components/ViewActions';

import { TVShowActionsProps, TVShowActionsMouseEvent } from './types';

const TVShowActions: FC<TVShowActionsProps> = ({ show, ...rest }) => {
	const { color, colorMode } = useUserTheme();

	const { mediaItem, isOpen } = useSelector((state) => state.modals.ui.bookmarkModal);

	const { id, name = '' } = show;

	const [isHovering, setIsHovering] = useBoolean();

	return (
		<ViewActions {...rest}>
			<Like<'tv'>
				renderAction={({ iconType, iconCategory, isDisabled, isLiked, onClick }) => (
					<Button
						color={isLiked ? 'red' : 'gray'}
						colorMode={colorMode}
						renderLeft={() => <Icon icon={iconType} category={iconCategory} />}
						isDisabled={isDisabled || !show}
						isFullWidth
						onClick={(event: TVShowActionsMouseEvent) => {
							event.preventDefault();
							event.stopPropagation();

							onClick();
						}}
						size='lg'
						variant='outlined'
					>
						{isLiked
							? `Dislike ${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })}`
							: `Like ${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })}`}
					</Button>
				)}
				title={name}
				mediaType='tv'
				mediaItem={show}
			/>
			<Bookmark<'tv'>
				renderAction={({ iconType, iconCategory, isDisabled, isBookmarked, isBookmarkedMultiple, onClick }) => (
					<Button
						color={
							(isOpen && mediaItem?.id === id) || isBookmarked || isBookmarkedMultiple ? color : 'gray'
						}
						colorMode={colorMode}
						renderLeft={() => <Icon icon={iconType} category={iconCategory} />}
						isDisabled={isDisabled}
						isFullWidth
						onClick={(event: TVShowActionsMouseEvent) => {
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
							? `Remove ${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })} from ${
									isBookmarkedMultiple ? 'lists' : 'list'
							  }`
							: `Add ${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })} to a list`}
					</Button>
				)}
				title={name}
				mediaType='tv'
				mediaItem={show}
				isHovering={isHovering}
			/>
		</ViewActions>
	);
};

export default TVShowActions;
