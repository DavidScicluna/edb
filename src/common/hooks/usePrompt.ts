import { useContext, useEffect } from 'react';

import { To, UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { defaultPromptConfirmModal, setPromptConfirmModal } from '../../store/slices/Modals';

type UsePromptProps = { title: string; subtitle: string; when: boolean };

const usePrompt = ({ title, subtitle, when = true }: UsePromptProps): void => {
	const { navigator } = useContext(NavigationContext);

	const push = navigator.push;

	const dispatch = useDispatch();

	const handleOnConfirm = (to: To): void => {
		dispatch(setPromptConfirmModal({ ...defaultPromptConfirmModal }));

		push(to);
	};

	useEffect(() => {
		if (!when) {
			return;
		}

		navigator.push = (to: To) => {
			dispatch(
				setPromptConfirmModal({
					isOpen: true,
					title,
					subtitle,
					onConfirm: () => handleOnConfirm(to)
				})
			);
		};

		return () => {
			navigator.push = push;
		};
	}, [navigator, when]);
};

export default usePrompt;
