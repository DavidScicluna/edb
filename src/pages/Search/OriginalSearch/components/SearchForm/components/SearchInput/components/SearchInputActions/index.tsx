import { FC } from 'react';

import { Divider, IconButton, IconButtonIcon, Fade } from '@davidscicluna/component-library';

import { HStack } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { useUserTheme } from '../../../../../../../../../common/hooks';

import { SearchInputActionsProps } from './types';

const SearchInputActions: FC<SearchInputActionsProps> = (props) => {
	const { color, colorMode } = useUserTheme();

	const [containerRef, { height: containerHeight }] = useElementSize();

	const { hasQuery = false, isDisabled = false, isSubmitDisabled = false, onClear } = props;

	return (
		<HStack
			ref={containerRef}
			divider={<Divider colorMode={colorMode} orientation='vertical' height={`${containerHeight}px`} />}
			spacing={1}
		>
			<Fade in={hasQuery}>
				<IconButton
					aria-label='Clear search'
					colorMode={colorMode}
					isDisabled={isDisabled}
					onClick={() => onClear()}
					size='sm'
					variant='icon'
				>
					<IconButtonIcon icon='clear' category='outlined' />
				</IconButton>
			</Fade>

			<IconButton
				aria-label='Submit Search'
				color={color}
				colorMode={colorMode}
				isDisabled={isDisabled || isSubmitDisabled || !hasQuery}
				type='submit'
				size='sm'
				variant='icon'
			>
				<IconButtonIcon icon='send' category='outlined' />
			</IconButton>
		</HStack>
	);
};

export default SearchInputActions;
