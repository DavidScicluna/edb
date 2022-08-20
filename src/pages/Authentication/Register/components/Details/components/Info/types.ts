import { DetailsProps } from '../../types';

type Placeholder = {
	firstName: string;
	lastName: string;
};

export type InfoProps = DetailsProps & {
	placeholder: Placeholder;
};
