import { FC } from 'react';

import { useTheme, Icon, utils } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../../../../../../../../common/hooks';
import {
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyIcon,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle
} from '../../../../../../../../../../../components';
import { formatMediaTypeLabel } from '../../../../../../../../../../../common/utils';
import { MediaType } from '../../../../../../../../../../../common/types';

const { getColor } = utils;

const mediaTypes: Exclude<MediaType, 'collection'>[] = ['movie', 'tv', 'person', 'company'];

const MyLikesTabEmpty: FC = () => {
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
							icon='favorite_border'
						/>
					)}
					p={2}
				/>
				<QueryEmptyBody>
					<QueryEmptyTitle />
					<QueryEmptySubtitle>
						{`Unfortunately couldn't find anything in the liked list! Please like a ${mediaTypes
							.map((mediaType) => formatMediaTypeLabel({ type: 'single', mediaType }))
							.join(', ')}, or ${formatMediaTypeLabel({
							type: 'single',
							mediaType: 'collection'
						})} to be able to view it in the liked list.`}
					</QueryEmptySubtitle>
				</QueryEmptyBody>
			</QueryEmptyStack>
		</QueryEmpty>
	);
};

export default MyLikesTabEmpty;
