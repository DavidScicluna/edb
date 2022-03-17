import * as yup from 'yup';

export const detailsSchema = yup.object().shape({
	username: yup
		.string()
		.required()
		.matches(/^[a-z0-9_-]+$/, 'Must be only in lowercase!')
		.max(20, 'Cannot exceed 20 chars!')
		.label('Username'),
	password: yup
		.string()
		.required()
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
			'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character!'
		)
		.max(30, 'Cannot exceed 30 chars!')
		.label('Password'),
	firstName: yup.string().required().max(30, 'cannot exceed 30 chars!').label('First name'),
	lastName: yup.string().required().max(30, 'cannot exceed 30 chars!').label('Last name'),
	bio: yup.string().label('Biography')
});
