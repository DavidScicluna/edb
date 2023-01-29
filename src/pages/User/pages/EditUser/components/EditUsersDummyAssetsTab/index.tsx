import { FC } from 'react';

import EditUsersDummyStructure from '../EditUsersDummyStructure';
import UserDummyAssets from '../../../../components/UserDummyAssets';

const EditUsersDummyAssetsTab: FC = () => {
	return (
		<EditUsersDummyStructure title='Avatar & Background' subtitle='Upload an avatar & background of your choice!'>
			<UserDummyAssets />
		</EditUsersDummyStructure>
	);
};

export default EditUsersDummyAssetsTab;
