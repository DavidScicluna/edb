import { ReactElement } from 'react';

import { HStack, Center } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import Divider from '../../../../../Divider';
import Actions from '../../../components/Actions';
import { ScrollMenu } from '../../../types';

import { HeaderProps } from './types';
import Title from './components/Title';

const Header = (props: HeaderProps): ReactElement => {
	const [ref, { width, height }] = useElementSize();

	const { title, scrollMenu, isDisabled = false, isLeftDisabled = false, isRightDisabled = true } = props;

	const { scrollPrev, scrollNext } = scrollMenu as ScrollMenu;

	return (
		<HStack width='100%' divider={<Divider orientation='vertical' height={`${height}px`} />} spacing={2}>
			<Center width={`calc(100% - ${width + 34}px)`} justifyContent='flex-start'>
				{title ? typeof title === 'string' ? <Title>{title}</Title> : title : undefined}
			</Center>
			<Center ref={ref}>
				<Actions
					isLeftDisabled={isDisabled || isLeftDisabled}
					isRightDisabled={isDisabled || isRightDisabled}
					onLeftClick={scrollPrev}
					onRightClick={scrollNext}
				/>
			</Center>
		</HStack>
	);
};

export default Header;
