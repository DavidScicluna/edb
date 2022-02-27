/**
 * This method will check whether the number passed is in between the 2 active values
 *
 * @param number number - The number to check
 * @param value array of number - The active numbers
 * @returns boolean - If number is between the 2 active numbers
 */
export const handleCheckIfInRange = (number: number, value?: number[]): boolean => {
	if (value && value.length > 0) {
		return value[0] < number && value[1] > number;
	} else {
		return false;
	}
};
