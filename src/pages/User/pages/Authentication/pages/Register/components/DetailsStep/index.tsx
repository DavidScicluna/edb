import { FC } from 'react';

import { useConst, VStack } from '@chakra-ui/react';

import { range, sample } from 'lodash';

import {
	usernames as usernamePlaceholders,
	firstNames as firstNamePlaceholders,
	lastNames as lastNamePlaceholders
} from '../../../../../../../../common/data/placeholders/user';

import Credentials from './components/Credentials';
import Info from './components/Info';
import { DetailsStepProps } from './types';

const DetailsStep: FC<DetailsStepProps> = (props) => {
	const placeholderIndex = useConst<number | undefined>(sample(range(usernamePlaceholders.length)));

	const usernamePlaceholder = useConst<string>(
		placeholderIndex ? usernamePlaceholders[placeholderIndex] : 'johnsmith'
	);

	const firstNamePlaceholder = useConst<string>(placeholderIndex ? firstNamePlaceholders[placeholderIndex] : 'John');
	const lastNamePlaceholder = useConst<string>(placeholderIndex ? lastNamePlaceholders[placeholderIndex] : 'Smith');

	return (
		<VStack width='100%' spacing={4}>
			<Credentials {...props} placeholder={usernamePlaceholder} />
			<Info {...props} placeholder={{ firstName: firstNamePlaceholder, lastName: lastNamePlaceholder }} />
		</VStack>
	);
};

export default DetailsStep;
