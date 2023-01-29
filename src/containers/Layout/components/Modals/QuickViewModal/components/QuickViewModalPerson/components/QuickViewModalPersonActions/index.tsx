import { FC } from 'react';

import { ButtonMouseEvent, Button, Icon } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../../../../../../common/hooks';
import { Like } from '../../../../../../../../../components';

import { QuickViewModalPersonActionsProps } from './types';

const QuickViewModalPersonActions: FC<QuickViewModalPersonActionsProps> = ({ person }) => {
	const { colorMode } = useUserTheme();

	const { name = '' } = person;

	return (
		<Like<'person'>
			renderAction={({ iconType, iconCategory, isDisabled, isLiked, onClick }) => (
				<Button
					color={isLiked ? 'red' : 'gray'}
					colorMode={colorMode}
					renderLeft={() => <Icon icon={iconType} category={iconCategory} />}
					isDisabled={isDisabled || !person}
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
			mediaType='person'
			mediaItem={person}
		/>
	);
};

export default QuickViewModalPersonActions;
