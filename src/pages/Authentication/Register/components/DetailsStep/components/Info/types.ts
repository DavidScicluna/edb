import { DetailsStepProps } from '../../types';

type Placeholder = {
	firstName: string;
	lastName: string;
};

export type InfoProps = DetailsStepProps & {
	placeholder: Placeholder;
};
