import { FC } from 'react';

import EditUsersDummyStructure from '../EditUsersDummyStructure';
import UserDummyGenres from '../../../components/UserDummyGenres';

const EditUsersDummyGenresTab: FC = () => {
	return (
		<EditUsersDummyStructure title='Favored Genres' subtitle='Select your most favorite Movie & TV Show genres.'>
			<UserDummyGenres />
		</EditUsersDummyStructure>
	);
};

export default EditUsersDummyGenresTab;
