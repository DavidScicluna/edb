import { ReactElement } from 'react';

import { IconButton, Icon } from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { useSelector } from '../../../../../../../../common/hooks';
import Tooltip from '../../../../../../../../components/Tooltip';
import { defaultUser, getUser, setUserOtherReviews } from '../../../../../../../../store/slices/Users';

import { ThumbButtonProps } from './types';

const ThumbButton = (props: ThumbButtonProps): ReactElement => {
	const dispatch = useDispatch();
	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const user = useSelector((state) => state.app.data.user);
	const otherReviews = useSelector(
		(state) =>
			getUser(state.users.data.users, state.app.data.user)?.data.reviews?.other ||
			defaultUser.data.reviews?.other ||
			[]
	);

	const { review, state, label, isDisabled: isDisabledProp = false } = props;
	const { id } = review || {};

	const [isHovering, setIsHovering] = useBoolean();

	const isActive = otherReviews.some((review) => review.id === id && review?.state === state) || false;

	const isDisabled: boolean = isNil(user) || isEmpty(user) || isDisabledProp;

	const handleReview = (): void => {
		if (review) {
			if (otherReviews.some((review) => review.id === id)) {
				dispatch(
					setUserOtherReviews({
						id: user || '',
						data: otherReviews.map((review) =>
							review.id === id ? { ...review, state: !isActive ? state : undefined } : review
						)
					})
				);
			} else {
				dispatch(
					setUserOtherReviews({
						id: user || '',
						data: [...otherReviews, { ...review, state }]
					})
				);
			}
		}
	};

	return (
		<Tooltip
			aria-label={isActive ? `Un-${label} review` : `${label} review`}
			label={isActive ? `Un-${label} review` : `${label} review`}
			isOpen={!isDisabled && isHovering}
			isDisabled={isDisabled}
			placement='top'
			gutter={4}
		>
			<IconButton
				aria-label={isActive ? `Un-${label} review` : `${label} review`}
				color={isActive ? color : 'gray'}
				isDisabled={isDisabled}
				onClick={() => handleReview()}
				onMouseEnter={() => setIsHovering.on()}
				onMouseLeave={() => setIsHovering.off()}
				variant='icon'
			>
				<Icon
					icon={state === 'isLiked' ? 'thumb_up' : 'thumb_down'}
					category={isActive ? 'filled' : 'outlined'}
				/>
			</IconButton>
		</Tooltip>
	);
};

export default ThumbButton;
