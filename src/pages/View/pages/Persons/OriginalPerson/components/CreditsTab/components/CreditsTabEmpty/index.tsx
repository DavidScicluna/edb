import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import {
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle
} from '../../../../../../../../../components';
import { useUserTheme } from '../../../../../../../../../common/hooks';
import { getEmptySubtitle } from '../../../../../../../../../components/QueryEmpty/common/utils';
import { usePersonContext } from '../../../../common/hooks';

const { getColor } = utils;

const CreditsTabEmpty: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { personQuery } = usePersonContext();

	const { data: person } = personQuery || {};
	const { name } = person || {};

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
				<QueryEmptyBody>
					<QueryEmptyTitle />
					<QueryEmptySubtitle>
						{getEmptySubtitle({
							type: 'empty',
							label: name ? `"${name}" Credits` : 'Credits'
						})}
					</QueryEmptySubtitle>
				</QueryEmptyBody>
			</QueryEmptyStack>
		</QueryEmpty>
	);
};

export default CreditsTabEmpty;
