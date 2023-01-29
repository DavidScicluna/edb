import { FC } from 'react';

import { ButtonMouseEvent, Button, Icon } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../../../../../../common/hooks';
import { Like } from '../../../../../../../../../components';

import { QuickViewModalCollectionActionsProps } from './types';

const QuickViewModalCollectionActions: FC<QuickViewModalCollectionActionsProps> = ({ collection }) => {
	const { colorMode } = useUserTheme();

	const { name = '' } = collection;

	return (
		<Like<'collection'>
			renderAction={({ iconType, iconCategory, isDisabled, isLiked, onClick }) => (
				<Button
					color={isLiked ? 'red' : 'gray'}
					colorMode={colorMode}
					renderLeft={() => <Icon icon={iconType} category={iconCategory} />}
					isDisabled={isDisabled || !collection}
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
			title={name}
			mediaType='collection'
			mediaItem={collection}
		/>
	);
};

export default QuickViewModalCollectionActions;
