import { ReactElement } from 'react';

import { useTheme, Skeleton } from '@davidscicluna/component-library';

import { useColorMode, useConst, ListItem as CUIListItem, VStack, HStack, Center, Text } from '@chakra-ui/react';

import merge from 'lodash/merge';
import range from 'lodash/range';
import sample from 'lodash/sample';
import { useElementSize } from 'usehooks-ts';

import useStyles from './styles';
import { ListItemProps } from './types';

const dummies = range(25, 100, 10);

const ListItem = (props: ListItemProps): ReactElement => {
	const theme = useTheme();
	const { colorMode } = useColorMode();

	const [badgeRef, { width: badgeWidth }] = useElementSize();
	const [actionsRef, { width: actionsWidth }] = useElementSize();

	const { title, subtitle, badge, actions, isLoading = true, variant = 'contained', ...rest } = props;

	const titleDummy = useConst<number>(sample(dummies) || 100);
	const subtitleDummy = useConst<number>(sample(dummies) || 100);

	const style = useStyles(theme, { variant, isLoading });

	return (
		<CUIListItem {...rest} px={2} py={1} sx={{ ...merge(style.common, style[colorMode]) }}>
			<VStack
				width={`calc(100% - ${actions ? actionsWidth + 16 : 0}px)`}
				alignItems='flex-start'
				justifyContent='center'
				spacing={badge ? 0.5 : 0}
			>
				<HStack
					width='100%'
					divider={
						<Text align='left' color={`gray.${colorMode === 'light' ? 400 : 500}`} fontSize='xs' mx={0.75}>
							•
						</Text>
					}
				>
					{badge ? <Center ref={badgeRef}>{badge}</Center> : null}
					<Skeleton
						width={isLoading ? `${titleDummy}%` : badge ? `calc(100% - ${badgeWidth + 10}px)` : '100%'}
						isLoaded={!isLoading}
						variant='text'
					>
						<Text
							align='left'
							color={`gray.${colorMode === 'light' ? 900 : 50}`}
							fontSize='md'
							noOfLines={1}
						>
							{title}
						</Text>
					</Skeleton>
				</HStack>
				{subtitle || isLoading ? (
					<HStack width='100%'>
						<Skeleton width={isLoading ? `${subtitleDummy}%` : '100%'} isLoaded={!isLoading} variant='text'>
							<Text
								align='left'
								color={`gray.${colorMode === 'light' ? 400 : 500}`}
								fontSize='xs'
								noOfLines={1}
							>
								{subtitle}
							</Text>
						</Skeleton>
					</HStack>
				) : null}
			</VStack>

			{actions ? <Center ref={actionsRef}>{actions}</Center> : null}
		</CUIListItem>
	);
};

export default ListItem;
