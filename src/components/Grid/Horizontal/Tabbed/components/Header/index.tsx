import React, { ReactElement } from 'react';

import { useMediaQuery, VStack, HStack, Center } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { HeaderProps } from './types';

import Divider from '../../../../../Divider';
import TabList from '../../../../../Tabs/components/TabList';
import Actions from '../../../components/Actions';
import Title from '../../../components/Title';
import { ScrollMenu } from '../../../types';

const Header = (props: HeaderProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const [ref, { width, height }] = useElementSize();

	const {
		scrollMenu,
		title,
		isDisabled = false,
		isLeftDisabled = false,
		isRightDisabled = true,
		renderTabListProps
	} = props;

	const { scrollPrev, scrollNext } = scrollMenu as ScrollMenu;

	return isSm ? (
		<VStack width='100%' alignItems='flex-start' spacing={2}>
			{title ? typeof title === 'string' ? <Title>{title}</Title> : title : null}
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
		</VStack>
	) : (
		<HStack width='100%' spacing={2}>
			<HStack width={`calc(100% - ${width + 16}px)`} spacing={2}>
				{title ? typeof title === 'string' ? <Title>{title}</Title> : title : null}
				<TabList {...renderTabListProps} />
			</HStack>
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
