import { FC } from 'react';

import { useTheme, ScaleFade, utils } from '@davidscicluna/component-library';

import { useConst } from '@chakra-ui/react';

import { Transition } from 'framer-motion';

import { TabIcon } from '../../../../../../../components';

import { EditUserErrorTabIconProps } from './types';

const { getTransitionConfig, getTransitionDelay } = utils;

const EditUserErrorTabIcon: FC<EditUserErrorTabIconProps> = (props) => {
	const theme = useTheme();

	const delay = useConst<number>(getTransitionDelay({ theme }));
	const config = useConst<Transition>({ ...getTransitionConfig({ theme }), delay });

	return (
		<ScaleFade in transition={{ enter: { ...config }, exit: { ...config } }}>
			<TabIcon {...props} color='red' icon='error_outline' category='outlined' />
		</ScaleFade>
	);
};

export default EditUserErrorTabIcon;
