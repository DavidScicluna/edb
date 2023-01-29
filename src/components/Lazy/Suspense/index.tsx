// import { FC, SuspenseProps, Suspense as RS, useCallback, useEffect, isValidElement } from 'react';
import { FC, SuspenseProps, Suspense as RS } from 'react';

// import { useBoolean } from '@chakra-ui/react';

// import { debounce } from 'lodash';

import ErrorBoundary from '../ErrorBoundary';

// let timer: ReturnType<typeof setTimeout>;

const Suspense: FC<SuspenseProps> = ({ children, fallback, ...rest }) => {
	// const [isChildrenVisible, setIsChildrenVisible] = useBoolean();

	// const handleCheckChildren = useCallback(
	// 	debounce(() => {
	// 		if (isValidElement(children)) {
	// 			timer = setTimeout(() => setIsChildrenVisible.on(), 500);
	// 		} else {
	// 			setIsChildrenVisible.off();
	// 		}
	// 	}, 500),
	// 	[children, timer]
	// );

	// useEffect(() => {
	// 	handleCheckChildren();

	// 	return () => {
	// 		clearTimeout(timer);
	// 	};
	// }, [children]);

	return (
		<ErrorBoundary>
			<RS {...rest} fallback={fallback}>
				{/* {isChildrenVisible ? children : fallback} */}
				{children}
			</RS>
		</ErrorBoundary>
	);
};

export default Suspense;
