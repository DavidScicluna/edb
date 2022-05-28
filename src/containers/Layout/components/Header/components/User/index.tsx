import { ReactElement, useEffect } from 'react';


import { Button } from '@davidscicluna/component-library';

import { useColorMode, useBoolean, Popover, PopoverTrigger, Portal, PopoverContent, VStack } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';


import { useSelector } from '../../../../../../common/hooks';
import Avatar from '../../../../../../components/Avatar';
import Divider from '../../../../../../components/Divider';
import { defaultUser, getUser } from '../../../../../../store/slices/Users';

import Header from './components/Header';
import Footer from './components/Footer';
import Actions from './components/Actions';

const User = (): ReactElement => {
	const { colorMode } = useColorMode();

	const user = useSelector((state) => getUser(state.users.data.users, state.app.data.user) || defaultUser);

	const location = useLocation();

	const [isOpen, setIsOpen] = useBoolean();

	useEffect(() => setIsOpen.off(), [location]);

	return (
		<>
			<Popover isOpen={isOpen} placement='bottom-end' gutter={8} onClose={() => setIsOpen.off()}>
				<PopoverTrigger>
					<Button onClick={() => setIsOpen.toggle()} size='sm' variant='text' sx={{ front: { p: 0.5 } }}>
						<Avatar
							alt={user.data.info?.name || 'User'}
							borderRadius='full'
							cursor='pointer'
							src={user.data.info?.avatar_path || ''}
						/>
					</Button>
				</PopoverTrigger>
				<Portal>
					<PopoverContent
						width='auto'
						minWidth='275px'
						borderWidth='2px'
						borderStyle='solid'
						borderColor={`gray.${colorMode === 'light' ? 200 : 700}`}
						borderRadius='lg'
						backgroundColor={`gray.${colorMode === 'light' ? 50 : 900}`}
						boxShadow='2xl'
						p={2}
						_focus={{ boxShadow: 'none' }}
					>
						<VStack width='100%' divider={<Divider />} spacing={2}>
							<Header
								avatar_path={user.data.info?.avatar_path}
								name={user.data.info?.name || 'Name'}
								username={user.data.credentials?.username || 'username'}
							/>

							<Actions />

							<Footer />
						</VStack>
					</PopoverContent>
				</Portal>
			</Popover>
		</>
	);
};

export default User;
