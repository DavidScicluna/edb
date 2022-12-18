import { FC } from 'react';

import { Icon } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import ViewInfoItem from '../ViewInfoItem';

import { ViewInfoLanguagesItemProps } from './types';

const ViewInfoLanguagesItem: FC<ViewInfoLanguagesItemProps> = ({ languages = [] }) => {
	return (
		<ViewInfoItem
			renderIcon={(props) => <Icon {...props} icon='language' category='outlined' />}
			renderLabel={(props) => (
				<Text {...props}>{languages.map(({ english_name }) => english_name).join(', ')}</Text>
			)}
		/>
	);
};

export default ViewInfoLanguagesItem;
