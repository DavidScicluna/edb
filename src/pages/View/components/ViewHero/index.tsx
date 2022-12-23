import { FC } from 'react';

import { Card, CardBody } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../common/hooks';

import { ViewHeroProps } from './types';

const ViewHero: FC<ViewHeroProps> = ({ children }) => {
	const { colorMode } = useUserTheme();

	return (
		<Card colorMode={colorMode} isFullWidth p={0.25}>
			<CardBody>{children}</CardBody>
		</Card>
	);
};

export default ViewHero;
