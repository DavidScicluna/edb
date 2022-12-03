import { FC } from 'react';

import SocialIconButton from '../SocialIconButton';
import { imdb as IMDBIcon } from '../../../../../../common/assets/icons';
import { CommonViewSocialsProps as IMDBIconButtonProps } from '../../common/types';

const IMDBIconButton: FC<IMDBIconButtonProps> = ({ id }) => {
	return (
		<SocialIconButton href={`https://www.imdb.com/alt/${id}`} type='imdb'>
			<IMDBIcon />
		</SocialIconButton>
	);
};

export default IMDBIconButton;
