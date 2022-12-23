import { FC } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import ViewHeroLabel from '../ViewHeroLabel';
import { useUserTheme } from '../../../../../../common/hooks';
import ViewHeroText from '../ViewHeroText';

import { ViewHeroDummyTaglineProps } from './types';

const ViewHeroDummyTagline: FC<ViewHeroDummyTaglineProps> = (props) => {
	const { colorMode } = useUserTheme();

	return (
		<ViewHeroLabel {...props} label='Tagline'>
			<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
				<ViewHeroText>Tagline</ViewHeroText>
			</Skeleton>
		</ViewHeroLabel>
	);
};

export default ViewHeroDummyTagline;
