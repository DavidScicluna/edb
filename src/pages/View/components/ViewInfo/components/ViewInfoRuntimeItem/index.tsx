import { FC, useState } from 'react';

import { useTheme, Tooltip, InternalLink, Icon, utils } from '@davidscicluna/component-library';

import { useBoolean, Center, Text } from '@chakra-ui/react';

import qs from 'query-string';
import { useUpdateEffect } from 'usehooks-ts';

import { runtimes } from '../../../../../../components/Filters/common/data/arrays';
import { useUserTheme } from '../../../../../../common/hooks';
import ViewInfoItem from '../ViewInfoItem';
import { formatMediaType, formatRuntime } from '../../../../../../common/utils';

import { ViewInfoRuntimeItemProps } from './types';

const { getColor } = utils;

const ViewInfoRuntimeItem: FC<ViewInfoRuntimeItemProps> = ({ mediaType, runtime }) => {
	const theme = useTheme();
	const { color: themeColor, colorMode } = useUserTheme();

	const [isHovering, setIsHovering] = useBoolean();

	const [color, setColor] = useState<string>(
		getColor({
			theme,
			colorMode,
			color: isHovering ? themeColor : 'gray',
			type: isHovering ? 'color' : 'text.secondary'
		})
	);

	const handleGetNearestRuntime = (runtime: number): number => {
		return runtimes.reduce((prev, curr) => (Math.abs(curr - runtime) < Math.abs(prev - runtime) ? curr : prev));
	};

	useUpdateEffect(() => {
		setColor(
			getColor({
				theme,
				colorMode,
				color: isHovering ? themeColor : 'gray',
				type: isHovering ? 'color' : 'text.secondary'
			})
		);
	}, [isHovering]);

	return (
		<Tooltip
			aria-label='Show full runtime (tooltip)'
			colorMode={colorMode}
			isOpen={isHovering}
			placement='bottom-start'
			label={`${mediaType === 'movie' ? 'Runtime' : 'Episode Average Runtime'}: ${formatRuntime({
				runtime,
				type: 'full'
			})}`}
			shouldWrapChildren
		>
			<Center>
				<InternalLink
					colorMode={colorMode}
					to={{
						pathname: `/${formatMediaType({ mediaType })}`,
						search: qs.stringify({ 'with_runtime.gte': handleGetNearestRuntime(runtime) })
					}}
				>
					<ViewInfoItem
						renderIcon={(props) => (
							<Icon {...props} color={color} icon='hourglass_empty' category='outlined' />
						)}
						renderLabel={(props) => (
							<Text {...props} color={color}>
								{formatRuntime({ runtime })}
							</Text>
						)}
						onMouseEnter={() => setIsHovering.on()}
						onMouseLeave={() => setIsHovering.off()}
					/>
				</InternalLink>
			</Center>
		</Tooltip>
	);
};

export default ViewInfoRuntimeItem;
