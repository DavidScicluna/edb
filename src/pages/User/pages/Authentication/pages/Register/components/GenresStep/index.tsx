import { FC } from 'react';

import { useOutletContext } from 'react-router';

import UserGenres from '../../../../../../components/UserGenres';
import {
	color as defaultColor,
	colorMode as defaultColorMode
} from '../../../../../../../../common/data/defaultPropValues';
import { AuthenticationOutletContext } from '../../../../types';

import { GenresStepProps } from './types';

const GenresStep: FC<GenresStepProps> = (props) => {
	const { color = defaultColor, colorMode = defaultColorMode } = useOutletContext<AuthenticationOutletContext>();

	return <UserGenres {...props} color={color} colorMode={colorMode} />;
};

export default GenresStep;
