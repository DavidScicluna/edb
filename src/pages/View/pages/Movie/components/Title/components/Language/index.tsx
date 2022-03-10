import { ReactElement } from 'react';

import { useConst, Text } from '@chakra-ui/react';

import { range, sample } from 'lodash';

import { LanguageProps } from './types';

import { useSelector } from '../../../../../../../../common/hooks';
import SkeletonText from '../../../../../../../../components/Skeleton/Text';

const dummies = range(25, 150, 20);

const Language = (props: LanguageProps): ReactElement => {
	const languages = useSelector((state) => state.options.data.languages);

	const { language, color, fontSize, isLoading = true } = props;

	const dummy = useConst<number>(sample(dummies) || 50);

	return (
		<SkeletonText width={isLoading ? `${dummy}px` : 'auto'} fontSize={fontSize} isLoaded={!isLoading}>
			<Text align='left' color={color} fontSize={fontSize} whiteSpace='nowrap'>
				{languages.find((paramLanguage) => paramLanguage.iso_639_1 === language)?.english_name ||
					'Movie Language'}
			</Text>
		</SkeletonText>
	);
};

export default Language;
