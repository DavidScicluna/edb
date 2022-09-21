import { useConst } from '@chakra-ui/react';

import { range, sample } from 'lodash';

import placeholders from '../data/placeholders';

const indexes = range(1, 16);

const useDummyText = (): string => {
	const randomIndex = useConst<number>(sample(indexes) || 8);
	const randomTitle = useConst<string>(placeholders.filter((_placeholder, index) => index <= randomIndex).join(' '));

	return randomTitle;
};

export default useDummyText;
