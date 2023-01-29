import { FC } from 'react';

import { Tooltip, Icon } from '@davidscicluna/component-library';

import { useBoolean, Text } from '@chakra-ui/react';

import { compact } from 'lodash';

import { useUserTheme } from '../../../../../../../../../common/hooks';
import { getDates } from '../../../../common/utils';
import ViewInfoItem from '../../../../../../../components/ViewInfo/components/ViewInfoItem';
import { formatDate } from '../../../../../../../../../common/utils';

import { PersonInfoDateProps } from './types';

const PersonInfoDate: FC<PersonInfoDateProps> = ({ birthday, deathday, place_of_birth }) => {
	const { colorMode } = useUserTheme();

	const [isHovering, setIsHovering] = useBoolean();

	return (
		<Tooltip
			aria-label='Show full birthday (tooltip)'
			colorMode={colorMode}
			isOpen={isHovering}
			placement='bottom-start'
			label={getDates({ birthday, deathday, place_of_birth })}
			shouldWrapChildren
		>
			<ViewInfoItem
				renderIcon={(props) => <Icon {...props} icon='cake' category='outlined' />}
				renderLabel={(props) => (
					<Text {...props}>
						{deathday
							? compact([
									formatDate({ date: birthday, section: 'year' }),
									formatDate({ date: deathday, section: 'year' })
							  ]).join(' - ')
							: formatDate({ date: birthday })}
					</Text>
				)}
				onMouseEnter={() => setIsHovering.on()}
				onMouseLeave={() => setIsHovering.off()}
			/>
		</Tooltip>
	);
};

export default PersonInfoDate;
