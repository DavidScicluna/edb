import { ReactElement, useEffect } from 'react';

import { Button } from '@davidscicluna/component-library';

import { useColorMode, useBoolean, VStack, Text, Collapse, ScaleFade } from '@chakra-ui/react';
import range from 'lodash/range';
import { useElementSize } from 'usehooks-ts';


import SkeletonText from '../../../../../../../../components/Skeleton/Text';

import { BodyProps } from './types';

const Body = (props: BodyProps): ReactElement => {
	const { colorMode } = useColorMode();

	const [contentRef, { height }] = useElementSize();

	const { content, isLoading = true } = props;

	const [isExpanded, setIsExpanded] = useBoolean();

	// const [height, setHeight] = useState<number>();

	// const handleContentRef = useCallback(
	//   debounce((ref: HTMLDivElement | null) => {
	//     if (ref) {
	//       setHeight(ref.offsetHeight);
	//     } else {
	//       handleContentRef(contentRef.current);
	//     }
	//   }, 250),
	//   [contentRef]
	// );

	// useEffect(() => {
	//   handleContentRef(contentRef.current);
	// }, [windowWidth]);

	useEffect(() => {
		setIsExpanded.off();
	}, [isLoading]);

	useEffect(() => {
		return () => {
			setIsExpanded.off();
		};
	}, []);

	return (
		<VStack width='100%' maxWidth='100%' spacing={2}>
			{!isLoading && content ? (
				<Collapse
					in={isExpanded}
					startingHeight={(height || 176) >= 176 ? 176 : height || 176}
					style={{ width: 'inherit', maxWidth: 'inherit' }}
				>
					<VStack ref={contentRef} width='100%' maxWidth='100%' alignItems='flex-start' spacing={2}>
						{[content].map((paragraph, index) => (
							<Text
								key={index}
								align='left'
								color={`gray.${colorMode === 'light' ? 900 : 50}`}
								fontSize='md'
								fontWeight='medium'
							>
								{paragraph}
							</Text>
						))}
					</VStack>
				</Collapse>
			) : (
				<VStack width='100%' spacing={1}>
					{range(0, 3).map((_dummy, index) => (
						<SkeletonText key={index} width='100%' fontSize='xs' isLoaded={!isLoading}>
							<Text align='left' fontSize='xs'>
								{`Paragraph ${index + 1}`}
							</Text>
						</SkeletonText>
					))}
				</VStack>
			)}

			<ScaleFade in={(height || 0) > 176} unmountOnExit style={{ width: '100%' }}>
				<Button
					isFullWidth
					isDisabled={isLoading}
					onClick={() => setIsExpanded.toggle()}
					size='sm'
					variant='text'
				>
					{`Read ${isExpanded ? 'Less' : 'More'}`}
				</Button>
			</ScaleFade>
		</VStack>
	);
};

export default Body;
