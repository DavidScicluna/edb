import { ReviewProps } from '../../types';

export type BodyProps = Omit<ReviewProps, 'author' | 'author_details' | 'created_at' | 'updated_at'>;
