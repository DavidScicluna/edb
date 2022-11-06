import { FC } from 'react';

import { useTheme, Icon, utils } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../../../../../../../../../../common/hooks';
import {
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyIcon,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle
} from '../../../../../../../../../../../../../components';
import { formatMediaTypeLabel } from '../../../../../../../../../../../../../common/utils';

const { getColor } = utils;

const MyListsTabListTabEmpty: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	return (
		<QueryEmpty
			color={color}
			colorMode={colorMode}
			borderWidth='2px'
			borderStyle='dashed'
			borderColor={getColor({ theme, colorMode, type: 'divider' })}
			borderRadius='lg'
		>
			<QueryEmptyStack>
				<QueryEmptyIcon
					renderIcon={(props) => (
						<Icon
							{...props}
							width={theme.fontSizes['6xl']}
							height={theme.fontSizes['6xl']}
							fontSize={theme.fontSizes['6xl']}
							icon='bookmark_border'
						/>
					)}
					p={2}
				/>
				<QueryEmptyBody>
					<QueryEmptyTitle />
					<QueryEmptySubtitle>
						{`Unfortunately couldn't find anything in the list! Please add a ${formatMediaTypeLabel({
							type: 'single',
							mediaType: 'movie'
						})} or ${formatMediaTypeLabel({
							type: 'single',
							mediaType: 'tv'
						})} to be able to view it in the list.`}
					</QueryEmptySubtitle>
				</QueryEmptyBody>
			</QueryEmptyStack>
		</QueryEmpty>
	);
};

export default MyListsTabListTabEmpty;
