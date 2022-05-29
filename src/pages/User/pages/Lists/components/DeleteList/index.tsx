import { ReactElement } from 'react';

import {
	ConfirmModal,
	ConfirmModalBody,
	ConfirmModalTitle,
	ConfirmModalSubtitle,
	ConfirmModalFooter,
	Button,
	IconButton,
	Icon
} from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { useSelector } from '../../../../../../common/hooks';
import { defaultUser, getUser, setUserLists } from '../../../../../../store/slices/Users';

import { DeleteListProps } from './types';

const DeleteList = ({ id, isOpen, onClose, onCloseToast }: DeleteListProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const dispatch = useDispatch();
	const user = useSelector((state) => state.app.data.user);
	const lists = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.data.lists || defaultUser.data.lists || []
	);
	const list = useSelector((state) =>
		(getUser(state.users.data.users, state.app.data.user)?.data.lists || []).find((list) => list.id === id)
	);

	const handleDelete = (): void => {
		if (list) {
			dispatch(
				setUserLists({
					id: user || '',
					data: lists.filter((paramList) => paramList.id !== list.id)
				})
			);
		}

		onClose();
		onCloseToast();
	};

	return (
		<ConfirmModal
			renderCancel={({ icon, category, ...rest }) => (
				<IconButton {...rest}>
					<Icon icon={icon} category={category} />
				</IconButton>
			)}
			isOpen={isOpen}
			onClose={onClose}
		>
			<ConfirmModalBody>
				<ConfirmModalTitle>
					{isSm ? 'Delete' : `Delete ${list ? `"${list.label}"` : ''} list`}
				</ConfirmModalTitle>
				<ConfirmModalSubtitle>
					{`Are you sure you want to delete the ${
						list ? `"${list.label}"` : ''
					} list? You will not be able to retrieve this list back!`}
				</ConfirmModalSubtitle>
			</ConfirmModalBody>
			<ConfirmModalFooter
				renderCancel={(props) => (
					<Button {...props} onClick={onClose}>
						Cancel
					</Button>
				)}
				renderAction={(props) => (
					<Button {...props} color='red' isDisabled={isNil(user) || isEmpty(user)} onClick={handleDelete}>
						Delete
					</Button>
				)}
			/>
		</ConfirmModal>
	);
};

export default DeleteList;
