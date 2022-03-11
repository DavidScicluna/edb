import { ReactElement } from 'react';

import { useConst, Text } from '@chakra-ui/react';

import { range, sample } from 'lodash';

import { DepartmentProps } from './types';

import SkeletonText from '../../../../../../../../components/Skeleton/Text';

const dummies = range(25, 200, 5);

const Department = (props: DepartmentProps): ReactElement => {
	const { department, color, fontSize, isLoading = true } = props;

	const dummy = useConst<number>(sample(dummies) || 100);

	return (
		<SkeletonText width={isLoading ? `${dummy}px` : 'auto'} fontSize={fontSize} isLoaded={!isLoading}>
			<Text align='left' color={color} fontSize={fontSize} whiteSpace='nowrap'>
				{department || 'Department Name'}
			</Text>
		</SkeletonText>
	);
};

export default Department;
