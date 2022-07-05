import { ReactElement } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { useConst, Text } from '@chakra-ui/react';

import range from 'lodash/range';
import sample from 'lodash/sample';

import { DepartmentProps } from './types';

const dummies = range(25, 200, 5);

const Department = (props: DepartmentProps): ReactElement => {
	const { department, color, fontSize, isLoading = true } = props;

	const dummy = useConst<number>(sample(dummies) || 100);

	return (
		<Skeleton width={isLoading ? `${dummy}px` : 'auto'} isLoaded={!isLoading} variant='text'>
			<Text align='left' color={color} fontSize={fontSize} whiteSpace='nowrap'>
				{department || 'Department Name'}
			</Text>
		</Skeleton>
	);
};

export default Department;
