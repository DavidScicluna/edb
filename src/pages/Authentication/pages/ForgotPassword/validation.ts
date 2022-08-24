import * as yup from 'yup';

export const schema = yup.object().shape({
	username: yup.string().required().label('Username'),
	password: yup
		.string()
		.required()
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
			'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character!'
		)
		.max(30, 'Cannot exceed 30 chars!')
		.label('Password'),
	newPassword: yup
		.string()
		.required()
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
			'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character!'
		)
		.max(30, 'Cannot exceed 30 chars!')
		.notOneOf([yup.ref('password')], 'New password must not be equal to Password!')
		.label('Password'),
	confirmNewPassword: yup
		.string()
		.oneOf([yup.ref('newPassword')], 'Confirm Password must be equal to New Password!')
		.label('Password')
});
