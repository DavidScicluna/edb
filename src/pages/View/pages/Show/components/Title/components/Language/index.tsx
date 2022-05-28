import { ReactElement } from 'react';

import { useConst, Text } from '@chakra-ui/react';
import range from 'lodash/range';
import sample from 'lodash/sample';


import { useSelector } from '../../../../../../../../common/hooks';
import SkeletonText from '../../../../../../../../components/Skeleton/Text';

import { LanguageProps } from './types';

const dummies = range(25, 200, 5);

const Language = (props: LanguageProps): ReactElement => {
	const languages = useSelector((state) => state.options.data.languages);

	const { language, color, fontSize, isLoading = true } = props;

	const dummy = useConst<number>(sample(dummies) || 50);

	return (
		<SkeletonText width={isLoading ? `${dummy}px` : 'auto'} fontSize={fontSize} isLoaded={!isLoading}>
			<Text align='left' color={color} fontSize={fontSize} whiteSpace='nowrap'>
				{languages.find((paramLanguage) => paramLanguage.iso_639_1 === language)?.english_name ||
					'TV Show Language'}
			</Text>
		</SkeletonText>
	);
};

export default Language;
