import { FC } from 'react';

import { Tooltip, Icon } from '@davidscicluna/component-library';

import { useBoolean, Text } from '@chakra-ui/react';

import dayjs from 'dayjs';
import { sort } from 'fast-sort';
import { uniq } from 'lodash';

import ViewInfo from '../../../../../components/ViewInfo';
import ViewInfoItem from '../../../../../components/ViewInfo/components/ViewInfoItem';
import { getDates } from '../../common/utils';
import { useUserTheme } from '../../../../../../../common/hooks';

import { PersonInfoProps } from './types';

const PersonInfo: FC<PersonInfoProps> = ({ person, movieDepartments = [], tvShowDepartments = [] }) => {
	const { colorMode } = useUserTheme();

	const { birthday, deathday, place_of_birth } = person;

	const [isHoveringBirthday, setIsHoveringBirthday] = useBoolean();

	return (
		<ViewInfo>
			{birthday && (
				<Tooltip
					aria-label='Show full birthday (tooltip)'
					colorMode={colorMode}
					isOpen={isHoveringBirthday}
					placement='bottom-start'
					label={getDates({ birthday, deathday, place_of_birth })}
					shouldWrapChildren
				>
					<ViewInfoItem
						renderIcon={(props) => <Icon {...props} icon='cake' category='outlined' />}
						renderLabel={(props) => <Text {...props}>{dayjs(birthday).format('LL')}</Text>}
						onMouseEnter={() => setIsHoveringBirthday.on()}
						onMouseLeave={() => setIsHoveringBirthday.off()}
					/>
				</Tooltip>
			)}

			{movieDepartments.length + tvShowDepartments.length > 0 && (
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
								.join(' • ')}
						</Text>
					)}
				/>
			)}
		</ViewInfo>
	);
};

export default PersonInfo;
