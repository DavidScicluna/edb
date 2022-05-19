import { ReactElement } from 'react';


import { useConst } from '@chakra-ui/react';

import { Link } from 'react-scroll';
import range from 'lodash/range';
import sample from 'lodash/sample';


import Button from '../../../../../Clickable/Button';
import SkeletonText from '../../../../../Skeleton/Text';

import { AccordionProps } from './types';

const dummies = range(25, 200, 5);

const Accordion = (props: AccordionProps): ReactElement => {
	const { id, title, color = 'gray', colorMode, isLoading = true, isDisabled = false, onToggle } = props;

	const dummy = useConst<number>(sample(dummies) || 100);

	return (
		<SkeletonText
			width={isLoading ? `${dummy}px` : 'auto'}
			colorMode={colorMode}
			fontSize='xs'
			isLoaded={!isLoading}
		>
			<Link to={!isDisabled && id ? id : ''} spy smooth isDynamic={false} offset={-82} delay={500}>
				<Button
					color={color}
					colorMode={colorMode}
					onClick={!isLoading && !isDisabled && onToggle ? () => onToggle() : undefined}
					isDisabled={isLoading}
					size='sm'
					variant='text'
					sx={{ front: { px: 0 } }}
				>
					{title || 'Accordion Title'}
				</Button>
			</Link>
		</SkeletonText>
	);
};

export default Accordion;
