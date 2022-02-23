import { ReactElement } from 'react';

import {
	useTheme,
	useColorMode,
	useMediaQuery,
	useConst,
	ListItem as CUIListItem,
	VStack,
	HStack,
	Center,
	Text
} from '@chakra-ui/react';

import _ from 'lodash';
import { useElementSize } from 'usehooks-ts';

import useStyles from './styles';
import { ListItemProps } from './types';

import SkeletonText from '../../../../../../../../components/Skeleton/Text';
import { Theme } from '../../../../../../../../theme/types';

const dummies = _.range(25, 100, 10);

const ListItem = (props: ListItemProps): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode } = useColorMode();

	const [isSm] = useMediaQuery('(max-width: 600px)');

	const [ref, { width }] = useElementSize();

	const { title, subtitle, badge, actions, isLoading = true, variant = 'contained', ...rest } = props;

	const titleDummy = useConst<number>(_.sample(dummies) || 100);
	const subtitleDummy = useConst<number>(_.sample(dummies) || 100);

	const style = useStyles(theme, { variant, isLoading });

	return (
		<CUIListItem {...rest} px={2} py={1} sx={{ ..._.merge(style.common, style[colorMode]) }}>
			<VStack
				width={`calc(100% - ${actions ? width + 16 : 0}px)`}
				alignItems='flex-start'
				justifyContent='center'
				spacing={0}
			>
				<HStack
					width='100%'
					divider={
						<Text align='left' color={`gray.${colorMode === 'light' ? 400 : 500}`} fontSize='xs' mx={1}>
							•
						</Text>
					}
				>
					<SkeletonText width={isLoading ? `${titleDummy}%` : '100%'} fontSize='md' isLoaded={!isLoading}>
						<Text
							align='left'
							color={`gray.${colorMode === 'light' ? 900 : 50}`}
							fontSize='md'
							isTruncated
							overflow='hidden'
							whiteSpace='nowrap'
						>
							{title}
						</Text>
					</SkeletonText>
					{!isSm && badge ? badge : null}
				</HStack>
				{(isSm ? subtitle || actions || isLoading : subtitle || isLoading) ? (
					<HStack
						width='100%'
						divider={
							<Text align='left' color={`gray.${colorMode === 'light' ? 400 : 500}`} fontSize='xs' mx={1}>
								•
							</Text>
						}
					>
						{isSm && badge ? badge : null}
						{subtitle ? (
							<SkeletonText
								width={isLoading ? `${subtitleDummy}%` : '100%'}
								fontSize='xs'
								isLoaded={!isLoading}
							>
								<Text
									align='left'
									color={`gray.${colorMode === 'light' ? 400 : 500}`}
									fontSize='xs'
									isTruncated
									overflow='hidden'
									whiteSpace='nowrap'
								>
									{subtitle}
								</Text>
							</SkeletonText>
						) : undefined}
					</HStack>
				) : null}
			</VStack>

			{actions ? <Center ref={ref}>{actions}</Center> : null}
		</CUIListItem>
	);
};

export default ListItem;
