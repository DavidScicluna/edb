import { getRatioDimensions } from '../../../../../../common/utils';
import { ViewPhotosHorizontalGridOrientation } from '../types';

type GetDimensionsProps = { orientation: ViewPhotosHorizontalGridOrientation };

export const getDimensions = ({ orientation }: GetDimensionsProps): number[] => {
	return [300, 330, 360, 390, 420].map((num) => getRatioDimensions({ height: num, orientation }));
};
