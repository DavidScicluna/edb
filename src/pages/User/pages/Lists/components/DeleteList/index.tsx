import { ReactElement } from 'react';


import { Button } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';


import { useSelector } from '../../../../../../common/hooks';
import ConfirmModal from '../../../../../../components/ConfirmModal';
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
			renderActions={({ colorMode, size }) => (
				<Button
					color='red'
					colorMode={colorMode}
					isDisabled={isNil(user) || isEmpty(user)}
					onClick={() => handleDelete()}
					size={size}
				>
					Delete
				</Button>
			)}
			title={isSm ? 'Delete' : `Delete ${list ? `"${list.label}"` : ''} list`}
			description={`Are you sure you want to delete the ${
				list ? `"${list.label}"` : ''
			} list? You will not be able to retrieve this list back!`}
			isOpen={isOpen}
			onClose={onClose}
		/>
	);
};

export default DeleteList;
