import { ReactElement } from 'react';

import { useColorMode, Text } from '@chakra-ui/react';

import { LanguagesProps } from './types';

import HorizontalScroll from '../../../../../../../../../../components/HorizontalScroll';
import Language from '../Language';

const Languages = ({ languages = [], isLoading = true }: LanguagesProps): ReactElement => {
	const { colorMode } = useColorMode();

	return (
		<HorizontalScroll
			renderDivider={({ padding }) => (
				<Text align='left' color={`gray.${colorMode === 'light' ? 900 : 50}`} fontSize='md' pr={padding}>
					,
				</Text>
			)}
			isDisabled={isLoading}
		>
			{languages.map((language, index) => (
				<Language key={index} language={language.iso_639_1} isLoading={isLoading} />
			))}
		</HorizontalScroll>
	);
};

export default Languages;
