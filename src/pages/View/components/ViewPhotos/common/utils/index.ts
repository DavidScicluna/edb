import { getRatioDimensions } from '../../../../../../common/utils';
import { ViewPhotosOrientation } from '../../OriginalViewPhotos/types';

type GetDimensionsProps = { orientation: ViewPhotosOrientation };

export const getDimensions = ({ orientation }: GetDimensionsProps): number[] => {
	return [300, 330, 360, 390, 420].map((num) => getRatioDimensions({ height: num, orientation }));
};
