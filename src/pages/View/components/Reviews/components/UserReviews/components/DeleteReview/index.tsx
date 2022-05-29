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

import { useDisclosure, useBoolean } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { useSelector } from '../../../../../../../../common/hooks';
import Tooltip from '../../../../../../../../components/Tooltip';
import { defaultUser, getUser, setUserReviews } from '../../../../../../../../store/slices/Users';

import { DeleteReviewProps } from './types';

const DeleteReview = ({ id }: DeleteReviewProps): ReactElement => {
	const { isOpen: isConfirmOpen, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure();

	const dispatch = useDispatch();
	const user = useSelector((state) => state.app.data.user);
	const userReviews = useSelector(
		(state) =>
			getUser(state.users.data.users, state.app.data.user)?.data.reviews?.user ||
			defaultUser.data.reviews?.user ||
			[]
	);

	const [isHovering, setIsHovering] = useBoolean();

	const isDisabled: boolean = isNil(user) || isEmpty(user);

	const handleDelete = (): void => {
		dispatch(
			setUserReviews({
				id: user || '',
				data: userReviews.filter((review) => review.id !== id)
			})
		);
		onCloseConfirm();
	};

	return (
		<>
			<Tooltip
				aria-label='Delete review'
				label='Delete review'
				isOpen={!isDisabled && isHovering}
				isDisabled={isDisabled}
				placement='top'
				gutter={6}
			>
				<IconButton
					aria-label='Delete review'
					color={isHovering ? 'red' : 'gray'}
					isDisabled={isDisabled}
					onClick={() => onOpenConfirm()}
					onMouseEnter={() => setIsHovering.on()}
					onMouseLeave={() => setIsHovering.off()}
					variant='icon'
				>
					<Icon icon='delete_outline' category='outlined' />
				</IconButton>
			</Tooltip>

			<ConfirmModal
				renderCancel={({ icon, category, ...rest }) => (
					<IconButton {...rest}>
						<Icon icon={icon} category={category} />
					</IconButton>
				)}
				isOpen={isConfirmOpen}
				onClose={onCloseConfirm}
			>
				<ConfirmModalBody>
					<ConfirmModalTitle>Delete review</ConfirmModalTitle>
					<ConfirmModalSubtitle>
						Are you sure you want to delete the review? You will not be able to retrieve this review back!
					</ConfirmModalSubtitle>
				</ConfirmModalBody>
				<ConfirmModalFooter
					renderCancel={(props) => (
						<Button {...props} onClick={onCloseConfirm}>
							Cancel
						</Button>
					)}
					renderAction={(props) => (
						<Button {...props} color='red' isDisabled={isDisabled} onClick={handleDelete}>
							Delete
						</Button>
					)}
				/>
			</ConfirmModal>
		</>
	);
};

export default DeleteReview;
