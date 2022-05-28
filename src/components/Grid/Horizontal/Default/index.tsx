import { ReactElement, useRef, useState, useCallback, useEffect } from 'react';

import '../common/styles/styles.css';
import { Card, CardBody, CardFooter } from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';
import debounce from 'lodash/debounce';

import Scroll from '../components/Scroll';
import { ScrollMenu } from '../types';

import { HorizontalGridDefaultProps } from './types';
import Header from './components/Header';

const HorizontalGridDefault = (props: HorizontalGridDefaultProps): ReactElement => {
	const ref = useRef<ScrollMenu>({} as ScrollMenu);

	const { children, title, footer, isDisabled = false, ...rest } = props;

	const [api, setApi] = useState<ScrollMenu>({} as ScrollMenu);
	const {
		initComplete = false,
		isFirstItemVisible = false,
		isLastItemVisible = false,
		visibleItemsWithoutSeparators = []
	} = api || {};

	const [isLeftDisabled, setIsLeftDisabled] = useBoolean(!initComplete || (initComplete && isFirstItemVisible));
	const [isRightDisabled, setIsRightDisabled] = useBoolean(
		!visibleItemsWithoutSeparators.length && isLastItemVisible
	);

	const handleUpdateApi = (api: ScrollMenu): void => {
		setApi(api);
	};

	const handleCheckIsDisabled = useCallback(
		debounce(() => {
			if (visibleItemsWithoutSeparators.length) {
				if (isFirstItemVisible) {
					setIsLeftDisabled.on();
				} else {
					setIsLeftDisabled.off();
				}

				if (isLastItemVisible) {
					setIsRightDisabled.on();
				} else {
					setIsRightDisabled.off();
				}
			}
		}, 0),
		[visibleItemsWithoutSeparators, isFirstItemVisible, isLastItemVisible, setIsLeftDisabled, setIsRightDisabled]
	);

	useEffect(() => handleCheckIsDisabled(), [isFirstItemVisible, isLastItemVisible, visibleItemsWithoutSeparators]);

	return (
		<Card {...rest} isFullWidth>
			<Header
				title={title}
				scrollMenu={ref.current}
				isDisabled={isDisabled}
				isLeftDisabled={isLeftDisabled}
				isRightDisabled={isRightDisabled}
			/>
			<CardBody>
				{Array.isArray(children) ? (
					<Scroll apiRef={ref} onInit={handleUpdateApi} onUpdate={handleUpdateApi}>
						{children}
					</Scroll>
				) : (
					children
				)}
			</CardBody>
			{footer && <CardFooter>{footer}</CardFooter>}
		</Card>
	);
};

export default HorizontalGridDefault;
