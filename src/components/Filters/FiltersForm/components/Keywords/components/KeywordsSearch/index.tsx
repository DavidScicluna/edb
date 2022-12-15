import { FC } from 'react';

import { Input, Icon } from '@davidscicluna/component-library';

import { useConst } from '@chakra-ui/react';

import { omit, sample, shuffle } from 'lodash';

import { useUserTheme } from '../../../../../../../common/hooks';
import { combined } from '../../../../../../../common/data/placeholders/search';

import { KeywordsSearchProps } from './types';

const KeywordsSearch: FC<KeywordsSearchProps> = ({ name, ...rest }) => {
	const { color, colorMode } = useUserTheme();

	const placeholder = useConst<string>(sample(shuffle(combined)) || combined[0]);

	return (
		<Input
			{...rest}
			color={color}
			colorMode={colorMode}
			autoComplete='off'
			id={name}
			name={name}
			placeholder={`Try "${placeholder}"`}
			isFullWidth
			renderLeftPanel={(props) => <Icon {...omit(props, 'color')} icon='search' category='outlined' />}
		/>
	);
};

export default KeywordsSearch;
