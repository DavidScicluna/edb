import { FC } from 'react';

import { useUserTheme } from '../../../../../../../common/hooks';
import {
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle
} from '../../../../../../../components';
import { getEmptySubtitle } from '../../../../../../../components/QueryEmpty/common/utils';

import { QuickViewModalEmptyProps } from './types';

const QuickViewModalEmpty: FC<QuickViewModalEmptyProps> = ({ label }) => {
	const { color, colorMode } = useUserTheme();

	return (
		<QueryEmpty color={color} colorMode={colorMode}>
			<QueryEmptyStack>
				<QueryEmptyBody>
					<QueryEmptyTitle />
					<QueryEmptySubtitle>{getEmptySubtitle({ type: 'empty', label })}</QueryEmptySubtitle>
				</QueryEmptyBody>
			</QueryEmptyStack>
		</QueryEmpty>
	);
};

export default QuickViewModalEmpty;
