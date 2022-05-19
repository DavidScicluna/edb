import { ReactElement } from 'react';

import {  IconButton, } from '@davidscicluna/component-library';

import { HStack, Fade } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';


import Divider from '../../../../../../../../components/Divider';
import Icon from '../../../../../../../../components/Icon';

import { ActionsProps } from './types';

const Actions = (props: ActionsProps): ReactElement => {
	const [ref, { height }] = useElementSize();

	const { hasQuery = false, isDisabled = false, onClear, onSubmit } = props;

	return (
		<HStack
			ref={ref}
			divider={
				<Fade in={hasQuery} unmountOnExit>
					<Divider orientation='vertical' height={`${height}px`} mx={1} />
				</Fade>
			}
		>
			<Fade in={hasQuery} unmountOnExit>
				<IconButton
					aria-label='Clear search'
					isDisabled={isDisabled}
					onClick={() => onClear()}
					size='sm'
					variant='icon'
				>
					<Icon icon='clear' type='outlined' />
				</IconButton>
			</Fade>

			<IconButton
				aria-label='Submit Search'
				isDisabled={isDisabled || !hasQuery}
				onClick={() => onSubmit()}
				size='sm'
				variant='icon'
			>
				<Icon icon='send' type='outlined' />
			</IconButton>
		</HStack>
	);
};

export default Actions;
