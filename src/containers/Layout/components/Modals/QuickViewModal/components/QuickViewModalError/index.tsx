import { FC } from 'react';

import { useTheme, Button, Badge, BadgeLabel, Icon } from '@davidscicluna/component-library';

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

import { QuickViewModalErrorProps } from './types';

const QuickViewModalError: FC<QuickViewModalErrorProps> = ({ label, status_code, status_message, refetch }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	return (
		<QueryEmpty color={color} colorMode={colorMode}>
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

				{status_code && status_message && (
					<Badge color={color} colorMode={colorMode}>
						<BadgeLabel>{`(${status_code}) ${status_message}`}</BadgeLabel>
					</Badge>
				)}

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

export default QuickViewModalError;
