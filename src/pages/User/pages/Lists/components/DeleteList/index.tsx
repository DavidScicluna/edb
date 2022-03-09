import { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { useMediaQuery } from '@chakra-ui/react';

import { DeleteListProps } from './types';

import { useSelector } from '../../../../../../common/hooks';
import Button from '../../../../../../components/Clickable/Button';
import ConfirmModal from '../../../../../../components/ConfirmModal';
import { setLists } from '../../../../../../store/slices/Users';

const DeleteList = ({ id, isOpen, onClose, onCloseToast }: DeleteListProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const dispatch = useDispatch();
	const lists = useSelector((state) => state.user.data.lists);
	const list = useSelector((state) => state.user.data.lists.find((list) => list.id === id));

	const handleDelete = (): void => {
		if (list) {
			dispatch(setLists(lists.filter((paramList) => paramList.id !== list.id)));
		}

		onClose();
		onCloseToast();
	};

	return (
		<ConfirmModal
			renderActions={({ colorMode, size }) => (
				<Button color='red' colorMode={colorMode} onClick={() => handleDelete()} size={size}>
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
