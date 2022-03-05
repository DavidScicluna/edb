import axios from 'axios';

export const handleDelay = <T>(ms: number, value: T): Promise<T> => {
	return new Promise<T>((resolve) => setTimeout(resolve, ms, value));
};

const instance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	headers: {
		Authorization: `Bearer ${process.env.REACT_APP_KEY}`
	}
});

export default instance;
