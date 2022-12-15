import { FC } from 'react';

import { Button } from '@davidscicluna/component-library';

import { HStack } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../common/hooks';

import { KeywordsCardActionsProps } from './types';

const KeywordsCardActions: FC<KeywordsCardActionsProps> = (props) => {
	const { color, colorMode } = useUserTheme();

	const { allKeywords = 0, keywords = 0, onClear, onToggle } = props;

	return (
		<HStack spacing={1}>
			<Button
				color={color}
				colorMode={colorMode}
				isDisabled={allKeywords === 0 || keywords === 0 || keywords === allKeywords}
				onClick={() => onClear()}
				size='xs'
				variant='text'
			>
				Clear
			</Button>
			<Button
				color={color}
				colorMode={colorMode}
				isDisabled={allKeywords === 0}
				onClick={() => onToggle()}
				size='xs'
				variant='text'
			>
				{`${keywords === allKeywords ? 'Remove' : 'Select'} All`}
			</Button>
		</HStack>
	);
};

export default KeywordsCardActions;
