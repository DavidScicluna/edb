import { FC } from 'react';

import { useTheme, Button, Icon, utils } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../../../../common/hooks';
import {
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyIcon,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle,
	QueryEmptyActions
} from '../../../../../../../components';
import { getEmptySubtitle } from '../../../../../../../components/QueryEmpty/common/utils';

import { EpisodeErrorProps } from './types';

const { getColor } = utils;

const EpisodeError: FC<EpisodeErrorProps> = ({ label, refetch }) => {
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
							icon='error_outline'
						/>
					)}
					p={2}
				/>
				<QueryEmptyBody>
					<QueryEmptyTitle />
					<QueryEmptySubtitle>{getEmptySubtitle({ type: 'error', label })}</QueryEmptySubtitle>
				</QueryEmptyBody>

				{refetch && (
					<QueryEmptyActions
						renderActions={(props) => (
							<Button {...props} onClick={refetch}>
								Try Again
							</Button>
						)}
					/>
				)}
			</QueryEmptyStack>
		</QueryEmpty>
	);
};

export default EpisodeError;
