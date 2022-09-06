import * as yup from 'yup';

export const detailsSchema = yup.object().shape({
	username: yup
		.string()
		.required()
		.matches(/^[a-z0-9_-]+$/, 'The username must be only in lowercase!')
		.min(5, 'The username must be at least 5 characters long!')
		.max(20, 'The username cannot exceed 20 characters!')
		.label('Username'),
	password: yup
		.string()
		.required()
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
			'The password must contain at least 8 Characters, One uppercase, One lowercase, One number and one special case character!'
		)
		.max(30, 'The password cannot exceed 30 characters!')
		.label('Password'),
	firstName: yup.string().required().max(30, 'The first name cannot exceed 30 characters!').label('First name'),
	lastName: yup.string().required().max(30, 'The last name cannot exceed 30 characters!').label('Last name'),
	bio: yup.string().label('Biography')
});
