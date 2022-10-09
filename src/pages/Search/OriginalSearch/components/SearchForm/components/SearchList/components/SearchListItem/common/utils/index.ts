type GetAmountReturn = {
	hover: number;
	active: number;
};

export const getAmount = (): GetAmountReturn => {
	return {
		hover: 0.05,
		active: 0.1
	};
};
