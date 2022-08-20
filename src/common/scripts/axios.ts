import axios from 'axios';
import { memoize } from 'lodash';

type GetAxiosDelayProps<T> = { ms: number; value: T };

export const getAxiosDelay = memoize(<T>({ ms, value }: GetAxiosDelayProps<T>): Promise<T> => {
	return new Promise<T>((resolve) => setTimeout(resolve, ms, value));
});

const instance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	headers: { Authorization: `Bearer ${process.env.REACT_APP_KEY}` }
});

export default instance;
