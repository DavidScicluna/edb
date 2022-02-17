import { FullPerson } from '../../../../../../common/types/person';

export type PersonTitleProps = {
	person?: FullPerson;
	departments?: string[];
	isLoading?: boolean;
};
