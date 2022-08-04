/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';

const useForceUpdate = () => {
	const [_counter, setCounter] = useState(0);
	return () => setCounter((counter) => counter + 1);
};

export default useForceUpdate;
