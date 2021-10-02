import * as yup from 'yup';

export const defaultValues = {
  review: '',
  rating: 0
};

export const schema = yup.object().shape({
  review: yup.string().required().label('Review'),
  rating: yup.number().nullable().label('Rating')
});
