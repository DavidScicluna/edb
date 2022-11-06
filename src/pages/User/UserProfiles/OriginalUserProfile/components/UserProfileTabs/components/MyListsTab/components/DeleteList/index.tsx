import { FC } from 'react';

import {
	useTheme,
	ConfirmModal,
	ConfirmModalStack,
	ConfirmModalIcon,
	ConfirmModalTitle,
	ConfirmModalSubtitle,
	ConfirmModalBody,
	ConfirmModalFooter,
	Button,
	IconButton,
	IconButtonIcon,
	Icon
} from '@davidscicluna/component-library';

import { useDispatch } from 'react-redux';
import { sort } from 'fast-sort';

import { useSelector, useUserTheme } from '../../../../../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../../../../../containers/Layout/common/hooks';
import { setUserLists } from '../../../../../../../../../../store/slices/Users';
import { UserList } from '../../../../../../../../../../store/slices/Users/types';

import { DeleteListProps } from './types';

const DeleteList: FC<DeleteListProps> = ({ list, isOpen, onClose, onDelete }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const dispatch = useDispatch();
	const { id, lists = [] } = useSelector((state) => state.users.data.activeUser.data);

	const handleDelete = (): void => {
		const updatedLists: UserList[] = lists.filter(({ id }) => id !== list.id);

		dispatch(setUserLists({ id, data: sort([...updatedLists]).desc(({ createdAt }) => createdAt) }));

		if (onDelete) {
			onDelete();
		}

		onClose();
	};

	return (
		<ConfirmModal
			colorMode={colorMode}
			renderCancel={({ icon, category, ...rest }) => (
				<IconButton {...rest}>
					<IconButtonIcon icon={icon} category={category} />
				</IconButton>
			)}
			isOpen={isOpen}
			onClose={onClose}
		>
			<ConfirmModalStack spacing={spacing} p={spacing}>
				<ConfirmModalIcon
					renderIcon={(props) => (
						<Icon
							{...props}
							width={theme.fontSizes['6xl']}
							height={theme.fontSizes['6xl']}
							fontSize={theme.fontSizes['6xl']}
							icon='delete_forever'
							category='outlined'
						/>
					)}
					color='red'
					p={2}
				/>

				<ConfirmModalBody>
					<ConfirmModalTitle>Delete List?</ConfirmModalTitle>
					<ConfirmModalSubtitle>
						{`Are you sure you want to delete the selected ${list ? `"${list.label}"` : ''}`}
					</ConfirmModalSubtitle>
					<ConfirmModalSubtitle>This action is irreversible!</ConfirmModalSubtitle>
				</ConfirmModalBody>

				<ConfirmModalFooter
					renderCancel={(props) => <Button {...props}>Cancel</Button>}
					renderAction={(props) => (
						<Button {...props} color='red' isDisabled={!id} onClick={handleDelete}>
							Delete
						</Button>
					)}
				/>
			</ConfirmModalStack>
		</ConfirmModal>
	);
};

export default DeleteList;
