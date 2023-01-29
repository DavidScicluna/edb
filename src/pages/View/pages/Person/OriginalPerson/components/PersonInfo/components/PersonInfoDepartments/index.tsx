import { FC } from 'react';

import { Icon } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { uniq } from 'lodash';
import { sort } from 'fast-sort';

import ViewInfoItem from '../../../../../../../components/ViewInfo/components/ViewInfoItem';

import { PersonInfoDepartmentsProps } from './types';

const PersonInfoDepartments: FC<PersonInfoDepartmentsProps> = ({ movieDepartments = [], tvShowDepartments = [] }) => {
	return (
		<ViewInfoItem
			renderIcon={(props) => <Icon {...props} icon='work_outline' category='outlined' />}
			renderLabel={(props) => (
				<Text {...props}>
					{sort(
						uniq([
							...movieDepartments.map(({ label }) => label),
							...tvShowDepartments.map(({ label }) => label)
						])
					)
						.asc()
						.join(', ')}
				</Text>
			)}
		/>
	);
};

export default PersonInfoDepartments;
