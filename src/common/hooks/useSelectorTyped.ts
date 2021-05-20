import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '../../store';

const useSelectorTyped: TypedUseSelectorHook<RootState> = useSelector;

export default useSelectorTyped;
