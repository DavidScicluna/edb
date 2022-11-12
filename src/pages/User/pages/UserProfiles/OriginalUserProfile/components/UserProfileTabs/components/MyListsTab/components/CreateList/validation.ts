import * as yup from 'yup';

export const schema = yup.object().shape({
	label: yup.string().required().label('Label'),
	description: yup.string().label('Description')
});
