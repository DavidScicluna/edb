import { ReactElement } from 'react';

import { Button } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import Link from '../../../../../../components/Clickable/Link';

import { ActionsProps } from './types';

const Actions = ({ show, isLoading = true }: ActionsProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	return (
		<Link isFullWidth={isSm} isDisabled={isLoading} to={{ pathname: `/tvshows/${show?.id}`, hash: 'seasons' }}>
			<Button isFullWidth={isSm} isDisabled={isLoading} variant='outlined'>
				{`Back to ${show?.name ? `"${show.name}"` : 'TV Show'} Seasons`}
			</Button>
		</Link>
	);
};

export default Actions;
