import * as yup from 'yup';

export const detailsSchema = yup.object().shape({
	username: yup
		.string()
		.required()
		.matches(/^[a-z0-9_-]+$/, 'The username must be only in lowercase!')
		.min(5, 'The username must be at least 5 characters long!')
		.max(20, 'The username cannot exceed 20 characters!')
		.label('Username'),
	newPassword: yup
		.string()
		.required()
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
			'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character!'
		)
		.max(30, 'Cannot exceed 30 chars!')
		.label('Password'),
	confirmNewPassword: yup
		.string()
		.oneOf([yup.ref('newPassword')], 'Confirm Password must be equal to Password!')
		.label('Confirm Password'),
	firstName: yup.string().required().max(30, 'The first name cannot exceed 30 characters!').label('First name'),
	lastName: yup.string().required().max(30, 'The last name cannot exceed 30 characters!').label('Last name'),
	bio: yup.string().label('Biography')
});
