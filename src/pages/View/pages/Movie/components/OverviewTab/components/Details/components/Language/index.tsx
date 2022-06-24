import { ReactElement } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { useColorMode, useConst, Text } from '@chakra-ui/react';
import range from 'lodash/range';
import sample from 'lodash/sample';

import { useSelector } from '../../../../../../../../../../common/hooks';

import { LanguageProps } from './types';

const dummies = range(25, 200, 5);

const Language = ({ language, isLoading = true }: LanguageProps): ReactElement => {
	const { colorMode } = useColorMode();

	const languages = useSelector((state) => state.options.data.languages);

	const dummy = useConst<number>(sample(dummies) || 50);

	return (
		<Skeleton width={isLoading ? `${dummy}px` : 'auto'} isLoaded={!isLoading} type='text'>
			<Text align='left' color={`gray.${colorMode === 'light' ? 900 : 50}`} fontSize='md' whiteSpace='nowrap'>
				{language
					? languages.find((paramLanguage) => paramLanguage.iso_639_1 === language)?.english_name
					: 'Movie Language'}
			</Text>
		</Skeleton>
	);
};

export default Language;
