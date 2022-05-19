import { ReactElement, Fragment, forwardRef, useRef, useState, useCallback, useEffect } from 'react';

import '../common/styles/styles.css';
import { useBoolean } from '@chakra-ui/react';

import debounce from 'lodash/debounce';


import Panel from '../../../Panel';
import Tabs from '../../../Tabs';
import TabPanels from '../../../Tabs/components/TabPanels';
import Scroll from '../components/Scroll';
import { ScrollMenu } from '../types';

import { HorizontalGridTabbedRef, HorizontalGridTabbedProps } from './types';
import Header from './components/Header';

const HorizontalGridTabbed = forwardRef<HorizontalGridTabbedRef, HorizontalGridTabbedProps>(
	function HorizontalGridTabbed(props, ref): ReactElement {
		const scrollRef = useRef<ScrollMenu>({} as ScrollMenu);

		const { children, footer, isDisabled = false, activeTab, onChange, renderTabListProps, ...rest } = props;

		const [api, setApi] = useState<ScrollMenu>({} as ScrollMenu);
		const {
			initComplete = false,
			isFirstItemVisible = false,
			isLastItemVisible = false,
			visibleItemsWithoutSeparators = []
		} = api || {};

		const [isLeftDisabled, setIsLeftDisabled] = useBoolean(!initComplete || (initComplete && isFirstItemVisible));
		const [isRightDisabled, setIsRightDisabled] = useBoolean(
			!visibleItemsWithoutSeparators.length && isLastItemVisible
		);

		const handleResetScroll = (): void => {
			scrollRef.current.scrollToItem(
				scrollRef.current.getItemById(scrollRef.current.items.toItems()[0]),
				'auto',
				'start'
			);
		};

		const handleOnChange = (index: number): void => {
			handleResetScroll();
			onChange(index);
		};

		const handleUpdateApi = (api: ScrollMenu): void => {
			setApi(api);
		};

		const handleCheckIsDisabled = useCallback(
			debounce(() => {
				if (visibleItemsWithoutSeparators.length) {
					if (isFirstItemVisible) {
						setIsLeftDisabled.on();
					} else {
						setIsLeftDisabled.off();
					}

					if (isLastItemVisible) {
						setIsRightDisabled.on();
					} else {
						setIsRightDisabled.off();
					}
				}
			}, 0),
			[
				visibleItemsWithoutSeparators,
				isFirstItemVisible,
				isLastItemVisible,
				setIsLeftDisabled,
				setIsRightDisabled
			]
		);

		useEffect(
			() => handleCheckIsDisabled(),
			[isFirstItemVisible, isLastItemVisible, visibleItemsWithoutSeparators]
		);

		return (
			<Tabs ref={ref} activeTab={activeTab} onChange={handleOnChange}>
				<Panel {...rest} isFullWidth>
					{{
						header: (
							<Header
								scrollMenu={scrollRef.current}
								isDisabled={isDisabled}
								isLeftDisabled={isLeftDisabled}
								isRightDisabled={isRightDisabled}
								renderTabListProps={renderTabListProps}
							/>
						),
						body: (
							<TabPanels>
								{children.map((panel, index) => (
									<Fragment key={index}>
										{panel.props.children && panel.props.children.length > 0 ? (
											<Scroll
												apiRef={scrollRef}
												onInit={handleUpdateApi}
												onUpdate={handleUpdateApi}
											>
												{panel.props.children}
											</Scroll>
										) : (
											panel
										)}
									</Fragment>
								))}
							</TabPanels>
						),
						footer
					}}
				</Panel>
			</Tabs>
		);
	}
);

export default HorizontalGridTabbed;
