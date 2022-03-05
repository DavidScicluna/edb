import { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

import Button from '../../../../../../components/Clickable/Button';
import Link from '../../../../../../components/Clickable/Link';
import Error from '../../../../../../pages/Error';

const NoMatch = (): ReactElement => {
	const location = useLocation();

	return (
		<Error
			code={404}
			title='Page not found!'
			subtitle='Please check the URL in the address bar and try again.'
			renderActions={({ color, colorMode, size }) => (
				<>
					<Link to='/'>
						<Button color={color} colorMode={colorMode} variant='outlined' size={size}>
							Go back home
						</Button>
					</Link>
					<Link to={location.pathname}>
						<Button color={color} colorMode={colorMode} size={size}>
							Try again
						</Button>
					</Link>
				</>
			)}
		/>
	);
};

export default NoMatch;
