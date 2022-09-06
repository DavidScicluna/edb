import { FC } from 'react';

import { Button } from '@davidscicluna/component-library';

import { HStack } from '@chakra-ui/react';

import {
	color as defaultColor,
	colorMode as defaultColorMode
} from '../../../../../../../../common/data/defaultPropValues';

import { ActionsProps } from './types';

const Actions: FC<ActionsProps> = (props) => {
	const { color = defaultColor, colorMode = defaultColorMode, allGenres = 0, genres = 0, onClear, onToggle } = props;

	return (
		<HStack spacing={1}>
			<Button
				color={color}
				colorMode={colorMode}
				isDisabled={allGenres === 0 || genres === 0 || genres === allGenres}
				onClick={() => onClear()}
				size='xs'
				variant='text'
			>
				Clear
			</Button>
			<Button
				color={color}
				colorMode={colorMode}
				isDisabled={allGenres === 0}
				onClick={() => onToggle()}
				size='xs'
				variant='text'
			>
				{`${genres === allGenres ? 'Remove' : 'Select'} All`}
			</Button>
		</HStack>
	);
};

export default Actions;
