import { ReactElement } from 'react';

import Error from '../../../../pages/Error';

import Actions from './components/Actions';


const NoMatch = (): ReactElement => {
	return (
		<Error
			code={404}
			title='Page not found!'
			subtitle='Please check the URL in the address bar and try again.'
			renderActions={(props) => <Actions {...props} />}
		/>
	);
};

export default NoMatch;
