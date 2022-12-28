import { FC } from 'react';

import { Icon } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import ViewReviewsReviewSubtitle from '../ViewReviewsReviewSubtitle';

import { ViewReviewsReviewUsernameProps } from './types';

const ViewReviewsReviewUsername: FC<ViewReviewsReviewUsernameProps> = ({ username }) => {
	return (
		<ViewReviewsReviewSubtitle
			renderIcon={(props) => <Icon {...props} icon='alternate_email' category='outlined' />}
			renderLabel={(props) => <Text {...props}>{username}</Text>}
		/>
	);
};

export default ViewReviewsReviewUsername;
