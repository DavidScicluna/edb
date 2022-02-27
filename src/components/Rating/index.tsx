import { ReactElement, forwardRef } from 'react';

import { useTheme, useColorMode, Center, VStack, Text } from '@chakra-ui/react';

import _ from 'lodash';

import { RatingRef, RatingProps } from './types';

import { Theme } from '../../theme/types';
import Icon from '../Icon';
import SkeletonText from '../Skeleton/Text';

const Rating = forwardRef<RatingRef, RatingProps>(function Rating(props, ref): ReactElement {
	const theme = useTheme<Theme>();
	const { colorMode } = useColorMode();

	const { children, inView = true, isLoading = false, size = 'md' } = props;

	/**
	 * This method will return the appropriate font-size from theme depending on size prop
	 *
	 * @returns - string: Theme size
	 */
	const handleReturnIconSize = (): string => {
		switch (size) {
			case 'xs':
				return theme.fontSizes.md;
			case 'sm':
				return theme.fontSizes.lg;
			case 'lg':
				return theme.fontSizes.xl;
			case 'xl':
				return theme.fontSizes['2xl'];
			case '2xl':
				return theme.fontSizes['3xl'];
			case '3xl':
				return theme.fontSizes['4xl'];
			default:
				return theme.fontSizes.xl;
		}
	};

	/**
	 * This method will return the appropriate font-size from theme depending on size prop
	 *
	 * @returns - string: Theme size
	 */
	// const handleReturnCountSize = (): string => {
	//   switch (size) {
	//     case 'sm':
	//       return 'xs';
	//     case 'lg':
	//       return 'sm';
	//     case 'xl':
	//       return 'sm';
	//     default:
	//       return 'xs';
	//   }
	// };

	return (
		<Center ref={ref}>
			<Icon
				icon='star'
				type='outlined'
				color={theme.colors.yellow[colorMode === 'light' ? 500 : 400]}
				fontSize={handleReturnIconSize()}
			/>

			{inView || isLoading ? (
				<SkeletonText fontSize={size} isLoaded={!isLoading} ml={0.5}>
					<VStack spacing={0.25}>
						<Text
							align='left'
							fontSize={size}
							fontWeight='semibold'
							color={`gray.${colorMode === 'light' ? 900 : 50}`}
							whiteSpace='nowrap'
						>
							{children && !isLoading
								? typeof children === 'number'
									? _.round(Number(children))
									: children
								: 'N/A'}
						</Text>
						{/* TODO: Find a way to better display count */}
						{/* {count ? (
            <Text color={`gray.${colorMode === 'light' ? 400 : 500}`} fontSize={handleReturnCountSize()}>
              {count}
            </Text>
          ) : null} */}
					</VStack>
				</SkeletonText>
			) : null}
		</Center>
	);
});

export default Rating;
