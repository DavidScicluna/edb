import axios from 'axios';
import { memoize } from 'lodash';

import store from '../../store';

type GetAxiosDelayProps<T> = { ms: number; value: T };

export const getAxiosDelay = memoize(<T>({ ms, value }: GetAxiosDelayProps<T>): Promise<T> => {
	return new Promise<T>((resolve) => setTimeout(resolve, ms, value));
});

const instance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	headers: { Authorization: `Bearer ${import.meta.env.VITE_KEY}` },
	params: { language: store.getState().users.data.activeUser.ui.language.iso_639_1 }
});

export default instance;
