import { useConst } from '@chakra-ui/react';

import { range, sample } from 'lodash';

import placeholders from '../data/placeholders';

type UseDummyTextProps = { orientation: 'vertical' | 'horizontal' };

const useDummyText = ({ orientation }: UseDummyTextProps): string => {
	const numbers = useConst<number[]>(range(orientation === 'vertical' ? 2 : 5, orientation === 'vertical' ? 6 : 15));

	const randomIndex = useConst<number>(sample(numbers) || orientation === 'vertical' ? 3 : 7);
	const randomTitle = useConst<string>(placeholders.filter((_placeholder, index) => index <= randomIndex).join(' '));

	return randomTitle;
};

export default useDummyText;
