import { ReactElement } from 'react';

import { HStack, Center } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import Divider from '../../../../../Divider';
import TabList from '../../../../../Tabs/components/TabList';
import Actions from '../../../components/Actions';
import { ScrollMenu } from '../../../types';

import { HeaderProps } from './types';

const Header = (props: HeaderProps): ReactElement => {
	const [ref, { width, height }] = useElementSize();

	const {
		scrollMenu,
		isDisabled = false,
		isLeftDisabled = false,
		isRightDisabled = true,
		renderTabListProps
	} = props;

	const { scrollPrev, scrollNext } = scrollMenu as ScrollMenu;

	return (
		<HStack width='100%' divider={<Divider orientation='vertical' height={`${height}px`} />} spacing={2}>
			<Center width={`calc(100% - ${width + 34}px)`}>
				<TabList {...renderTabListProps} />
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
