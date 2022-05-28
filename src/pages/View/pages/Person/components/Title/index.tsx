import { ReactElement } from 'react';

import { useConst, Text } from '@chakra-ui/react';
import range from 'lodash/range';
import sample from 'lodash/sample';

import SkeletonText from '../../../../../../components/Skeleton/Text';
import Title from '../../../../components/Title';

import Department from './components/Department';
import { PersonTitleProps } from './types';


const dummies = range(25, 100, 5);

const PersonTitle = (props: PersonTitleProps): ReactElement => {
	const { person, departments = [], isLoading = true } = props;

	const dummy = useConst<number>(sample(dummies) || 75);

	return (
		<Title
			mediaType='person'
			renderTitle={({ color, fontSize, fontWeight, lineHeight }) => (
				<SkeletonText width={isLoading ? `${dummy}%` : 'auto'} fontSize={fontSize} isLoaded={!isLoading}>
					<Text
						align='left'
						color={color}
						fontSize={fontSize}
						fontWeight={fontWeight}
						lineHeight={lineHeight}
						whiteSpace={isLoading ? 'nowrap' : 'normal'}
					>
						{person?.name || 'Person Name'}
					</Text>
				</SkeletonText>
			)}
			renderSubtitles={({ color, fontSize }) =>
				!isLoading
					? departments.map((department) => (
							<Department
								key={department}
								department={department}
								color={color}
								fontSize={fontSize}
								isLoading={false}
							/>
					  ))
					: range(0, 5).map((_dummy, index) => (
							<Department key={index} color={color} fontSize={fontSize} isLoading />
					  ))
			}
			isLoading={isLoading}
		/>
	);
};

export default PersonTitle;
