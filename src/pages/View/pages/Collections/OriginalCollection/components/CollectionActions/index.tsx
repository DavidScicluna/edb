import { FC } from 'react';

import { Button, Icon } from '@davidscicluna/component-library';

import { Like } from '../../../../../../../components';
import { useUserTheme } from '../../../../../../../common/hooks';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';
import ViewActions from '../../../../../components/ViewActions';

import { CollectionActionsProps, CollectionActionsMouseEvent } from './types';

const CollectionActions: FC<CollectionActionsProps> = ({ collection, ...rest }) => {
	const { colorMode } = useUserTheme();

	const { name = '' } = collection;

	return (
		<ViewActions {...rest}>
			<Like<'collection'>
				renderAction={({ iconType, iconCategory, isDisabled, isLiked, onClick }) => (
					<Button
						color={isLiked ? 'red' : 'gray'}
						colorMode={colorMode}
						renderLeft={() => <Icon icon={iconType} category={iconCategory} />}
						isDisabled={isDisabled || !collection}
						isFullWidth
						onClick={(event: CollectionActionsMouseEvent) => {
							event.preventDefault();
							event.stopPropagation();

							onClick();
						}}
						size='lg'
						variant='outlined'
					>
						{isLiked
							? `Dislike ${formatMediaTypeLabel({ type: 'single', mediaType: 'collection' })}`
							: `Like ${formatMediaTypeLabel({ type: 'single', mediaType: 'collection' })}`}
					</Button>
				)}
				title={name}
				mediaType='collection'
				mediaItem={collection}
			/>
		</ViewActions>
	);
};

export default CollectionActions;
