import { FC } from 'react';

import { InternalLink, Button } from '@davidscicluna/component-library';

import { useMediaQuery } from '@chakra-ui/react';

import Error from '../../../Error';

const NoMatch: FC = () => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	return (
		<Error
			code={404}
			title='Page not found!'
			subtitle='Please check the URL in the address bar and try again.'
			renderActions={(props) => (
				<>
					<InternalLink to='/' isFullWidth={isSm}>
						<Button {...props} isFullWidth>
							Go back home
						</Button>
					</InternalLink>

					<Button {...props} isFullWidth={isSm} onClick={() => window.location.reload()} variant='outlined'>
						Try again
					</Button>
				</>
			)}
		/>
	);
};

export default NoMatch;
