import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { ListItem as CUIListItem, VStack, HStack, Box } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { useUserTheme } from '../../../../../../../../../common/hooks';

import useStyles from './common/styles';
import { SearchListItemProps } from './types';

const { getColor } = utils;

const SearchListItem: FC<SearchListItemProps> = (props) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [badgeRef, { width: badgeWidth }] = useElementSize();
	const [actionsRef, { width: actionsWidth }] = useElementSize();

	const { renderTitle, renderSubtitle, renderBadge, actions, variant = 'contained', ...rest } = props;

	const style = useStyles({ theme, color, colorMode, variant });

	return (
		<CUIListItem {...rest} sx={style.listItem}>
			<VStack
				width={`calc(100% - ${actions ? actionsWidth + 16 : 0}px)`}
				alignItems='flex-start'
				justifyContent='center'
				spacing={0}
			>
				<HStack width='100%' alignItems='center' justifyContent='flex-start' spacing={renderBadge ? 0.5 : 0}>
					{renderBadge && <Box ref={badgeRef}>{renderBadge({ size: 'md' })}</Box>}

					<Box width={renderBadge ? `calc(100% - ${badgeWidth + 10}px)` : '100%'}>
						{renderTitle({
							align: 'left',
							color: getColor({ theme, colorMode, type: 'text.primary' }),
							fontSize: 'md',
							noOfLines: 1
						})}
					</Box>
				</HStack>

				{renderSubtitle && (
					<Box width='100%'>
						{renderSubtitle({
							align: 'left',
							color: getColor({ theme, colorMode, type: 'text.secondary' }),
							fontSize: 'xs',
							noOfLines: 1
						})}
					</Box>
				)}
			</VStack>

			{actions && <Box ref={actionsRef}>{actions}</Box>}
		</CUIListItem>
	);
};

export default SearchListItem;
