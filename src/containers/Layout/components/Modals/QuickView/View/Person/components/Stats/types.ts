export type Stat = {
	label: string;
	number: number;
};

export type StatsProps = {
	totalMovieCredits: number;
	totalTvCredits: number;
	totalCrewCredits: number;
	isLoading?: boolean;
};
