import { ReactElement } from 'react';
import { Link } from 'react-scroll';

import { useConst } from '@chakra-ui/react';

import _ from 'lodash';

import { AccordionProps } from './types';

import Button from '../../../../../Clickable/Button';
import SkeletonText from '../../../../../Skeleton/Text';

const dummies = _.range(25, 200, 5);

const Accordion = (props: AccordionProps): ReactElement => {
	const { id, title, color, isLoading = true, isDisabled = false, onToggle } = props;

	const dummy = useConst<number>(_.sample(dummies) || 100);

	return (
		<SkeletonText width={isLoading ? `${dummy}px` : 'auto'} fontSize='xs' isLoaded={!isLoading}>
			<Link to={!isDisabled && id ? id : ''} spy smooth isDynamic={false} offset={-82} delay={500}>
				<Button
					color={color}
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
