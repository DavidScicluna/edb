import * as yup from 'yup';

export const schema = yup.object().shape({
	username: yup.string().required().label('Username'),
	password: yup.string().required().label('Password')
});
