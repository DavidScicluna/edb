import { FC } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../../../../../common/hooks';
import ViewHeroText from '../../../ViewHeroText';

const ViewHeroDummyCrewPerson: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
			<ViewHeroText textTransform='capitalize'>Person</ViewHeroText>
		</Skeleton>
	);
};

export default ViewHeroDummyCrewPerson;
