import { FC } from 'react';

import { useBoolean } from '@chakra-ui/react';

import { useUpdateEffect } from 'usehooks-ts';

import { useSelector } from '../../../../common/hooks';
import { guest } from '../../../../store/slices/Users';

import { StructureProps } from './types';
import StructureTablet from './components/StructureTablet';
import StructureMobile from './components/StructureMobile';
import StructureDesktop from './components/StructureDesktop';

const Structure: FC<StructureProps> = ({ type }) => {
	const activeUser = useSelector((state) => state.users.data.activeUser);

	const [isGuest, setIsGuest] = useBoolean(guest.data.id === activeUser.data.id);

	useUpdateEffect(() => setIsGuest[guest.data.id === activeUser.data.id ? 'on' : 'off'](), [activeUser]);

	switch (type) {
		case 'mobile':
			return <StructureMobile isGuest={isGuest} />;
		case 'tablet':
			return <StructureTablet isGuest={isGuest} />;
		default:
			return <StructureDesktop isGuest={isGuest} />;
	}
};

export default Structure;
