import { FC } from 'react';

import { SimpleGrid } from '@chakra-ui/react';

import { Controller } from 'react-hook-form';
import { sort } from 'fast-sort';

import { useSelector } from '../../../../../../../common/hooks';

import { LanguagesProps } from './types';
import Language from './components/Language';

const Languages: FC<LanguagesProps> = ({ form }) => {
	const languages = useSelector((state) => state.options.data.languages || []);

	const { control, setValue } = form;

	return (
		<Controller
			control={control}
			name='language'
			render={({ field: { value, name } }) => (
				<SimpleGrid width='100%' columns={[1, 2, 3]} spacing={2}>
					{sort(languages)
						.by({ asc: 'english_name' })
						.filter(
							(language) =>
								!!language.name && !language.name.includes('?') && !language.name.includes('No')
						)
						.map((language) => (
							<Language
								key={language.iso_639_1 || ''}
								language={language}
								isActive={language.iso_639_1 === value.iso_639_1 || false}
								onClick={() => setValue(name, language, { shouldDirty: true })}
							/>
						))}
				</SimpleGrid>
			)}
		/>
	);
};

export default Languages;
