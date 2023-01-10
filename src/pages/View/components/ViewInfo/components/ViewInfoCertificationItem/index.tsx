import { FC } from 'react';

import { useTheme, Tooltip, InternalLink, utils } from '@davidscicluna/component-library';

import { useBoolean, Text } from '@chakra-ui/react';

import qs from 'query-string';

import { useUserTheme } from '../../../../../../common/hooks';
import ViewInfoItem from '../ViewInfoItem';
import { formatMediaType } from '../../../../../../common/utils';

import { ViewInfoCertificationItemProps } from './types';

const { getColor } = utils;

const ViewInfoCertificationItem: FC<ViewInfoCertificationItemProps> = ({ mediaType, certification, meaning }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isHovering, setIsHovering] = useBoolean();

	return (
		<Tooltip
			aria-label='Show certification meaning (tooltip)'
			colorMode={colorMode}
			isOpen={!!meaning && isHovering}
			placement='bottom-start'
			label={meaning}
			shouldWrapChildren
		>
			<InternalLink
				colorMode={colorMode}
				to={{ pathname: `/${formatMediaType({ mediaType })}`, search: qs.stringify({ certification }) }}
			>
				<ViewInfoItem
					renderLabel={(props) => (
						<Text
							{...props}
							color={getColor({
								theme,
								colorMode,
								color: isHovering ? color : 'gray',
								type: isHovering ? 'color' : 'text.secondary'
							})}
						>
							{certification}
						</Text>
					)}
					onMouseEnter={() => setIsHovering.on()}
					onMouseLeave={() => setIsHovering.off()}
				/>
			</InternalLink>
		</Tooltip>
	);
};

export default ViewInfoCertificationItem;
