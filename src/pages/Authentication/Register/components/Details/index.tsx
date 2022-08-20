import { FC } from 'react';

import { useConst, VStack } from '@chakra-ui/react';

import { range, sample } from 'lodash';

import {
	usernames as usernamePlaceholders,
	firstNames as firstNamePlaceholders,
	lastNames as lastNamePlaceholders
} from '../../../common/data/placeholders';

import Credentials from './components/Credentials';
import Info from './components/Info';
import { DetailsProps } from './types';

const Details: FC<DetailsProps> = ({ ...rest }) => {
	const placeholderIndex = useConst<number | undefined>(sample(range(usernamePlaceholders.length)));

	const usernamePlaceholder = useConst<string>(
		placeholderIndex ? usernamePlaceholders[placeholderIndex] : 'johnsmith'
	);

	const firstNamePlaceholder = useConst<string>(placeholderIndex ? firstNamePlaceholders[placeholderIndex] : 'John');
	const lastNamePlaceholder = useConst<string>(placeholderIndex ? lastNamePlaceholders[placeholderIndex] : 'Smith');

	return (
		<VStack width='100%' spacing={4}>
			<Credentials {...rest} placeholder={usernamePlaceholder} />
			<Info {...rest} placeholder={{ firstName: firstNamePlaceholder, lastName: lastNamePlaceholder }} />
		</VStack>
	);
};

export default Details;
