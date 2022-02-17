import { FullPerson } from '../../../../../../../../common/types/person';

export type BioProps = {
	birthday?: FullPerson['birthday'];
	place_of_birth?: FullPerson['place_of_birth'];
	deathday?: FullPerson['deathday'];
	biography?: FullPerson['biography'];
	isLoading?: boolean;
};
