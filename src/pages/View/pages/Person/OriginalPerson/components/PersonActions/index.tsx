import { FC } from 'react';

import { ButtonMouseEvent, Button, Icon } from '@davidscicluna/component-library';

import { Like } from '../../../../../../../components';
import { useUserTheme } from '../../../../../../../common/hooks';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';
import ViewActions from '../../../../../components/ViewActions';

import { PersonActionsProps } from './types';

const PersonActions: FC<PersonActionsProps> = ({ person, ...rest }) => {
	const { colorMode } = useUserTheme();

	const { name = '' } = person;

	return (
		<ViewActions {...rest}>
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
						size='lg'
						variant='outlined'
					>
						{isLiked
							? `Dislike ${formatMediaTypeLabel({ type: 'single', mediaType: 'person' })}`
							: `Like ${formatMediaTypeLabel({ type: 'single', mediaType: 'person' })}`}
					</Button>
				)}
				title={name}
				mediaType='person'
				mediaItem={person}
			/>
		</ViewActions>
	);
};

export default PersonActions;
