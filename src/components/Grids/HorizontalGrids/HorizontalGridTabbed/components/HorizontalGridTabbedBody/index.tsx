import { FC, Fragment, useContext } from 'react';

import { CardBody, TabPanels, HorizontalScroll } from '@davidscicluna/component-library';

import { Center } from '@chakra-ui/react';

import { HorizontalGridTabbedContext as HorizontalGridTabbedContextType } from '../../types';
import { HorizontalGridTabbedContext } from '../..';

import { HorizontalGridTabbedBodyProps } from './types';

const HorizontalGridTabbedBody: FC<HorizontalGridTabbedBodyProps> = ({ children, spacing = 2, ...rest }) => {
	const { onSetScroll } = useContext<HorizontalGridTabbedContextType>(HorizontalGridTabbedContext);

	return (
		<CardBody {...rest}>
			<TabPanels>
				{children.map((panel, index) => (
					<Fragment key={index}>
						{panel.props.children && panel.props.children.length > 0 ? (
							<HorizontalScroll
								// colorMode={colorMode}
								renderDivider={() => <Center mr={spacing} />}
								LeftArrow={<Center />}
								RightArrow={<Center />}
								onInit={(scroll) => onSetScroll(scroll)}
								onUpdate={(scroll) => onSetScroll(scroll)}
							>
								{panel.props.children}
							</HorizontalScroll>
						) : (
							panel
						)}
					</Fragment>
				))}
			</TabPanels>
		</CardBody>
	);
};

export default HorizontalGridTabbedBody;
