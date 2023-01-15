import { FC } from 'react';

import { Button, Icon } from '@davidscicluna/component-library';

import { useBoolean, HStack } from '@chakra-ui/react';

import { useSelector, useUserTheme } from '../../../../../../../../../common/hooks';
import { Bookmark, Like } from '../../../../../../../../../components';
import spacing from '../../../../common/data/spacing';

import { QuickViewModalTVShowActionsProps, QuickViewModalTVShowActionsMouseEvent } from './types';

const QuickViewModalTVShowActions: FC<QuickViewModalTVShowActionsProps> = ({ show }) => {
	const { color, colorMode } = useUserTheme();

	const { mediaItem, isOpen } = useSelector((state) => state.modals.ui.bookmarkModal);

	const { id, name = '' } = show;

	const [isHovering, setIsHovering] = useBoolean();

	return (
		<HStack width='100%' spacing={spacing}>
			<Like<'tv'>
				renderAction={({ iconType, iconCategory, isDisabled, isLiked, onClick }) => (
					<Button
						color={isLiked ? 'red' : 'gray'}
						colorMode={colorMode}
						renderLeft={() => <Icon icon={iconType} category={iconCategory} />}
						isDisabled={isDisabled || !show}
						isFullWidth
						onClick={(event: QuickViewModalTVShowActionsMouseEvent) => {
							event.preventDefault();
							event.stopPropagation();

							onClick();
						}}
						variant='outlined'
					>
						{isLiked ? 'Dislike' : 'Like'}
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
						onClick={(event: QuickViewModalTVShowActionsMouseEvent) => {
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
				title={name}
				mediaType='tv'
				mediaItem={show}
				isHovering={isHovering}
			/>
		</HStack>
	);
};

export default QuickViewModalTVShowActions;
