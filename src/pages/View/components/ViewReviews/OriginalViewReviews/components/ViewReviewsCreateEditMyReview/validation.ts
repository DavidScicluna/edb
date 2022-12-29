import * as yup from 'yup';

const schema = yup.object().shape({
	rating: yup.number().nullable().required().label('Rating'),
	content: yup.string().required().label('Content')
});

export default schema;
