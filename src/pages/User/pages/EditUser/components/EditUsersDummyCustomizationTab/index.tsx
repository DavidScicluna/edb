import { FC } from 'react';

import UserThemeDummyCustomization from '../../../../components/UserThemeDummyCustomization';
import EditUsersDummyStructure from '../EditUsersDummyStructure';

const EditUsersDummyCustomizationTab: FC = () => {
	return (
		<EditUsersDummyStructure title='Customization' subtitle='Pick your favorite color and mode.'>
			<UserThemeDummyCustomization />
		</EditUsersDummyStructure>
	);
};

export default EditUsersDummyCustomizationTab;
