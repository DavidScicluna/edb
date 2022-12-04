import { useContext } from 'react';

import { PersonContext } from '../..';
import { PersonContext as PersonContextType } from '../../types';

const usePersonContext = (): PersonContextType => {
	const context = useContext<PersonContextType>(PersonContext);

	return { ...context };
};

export default usePersonContext;
