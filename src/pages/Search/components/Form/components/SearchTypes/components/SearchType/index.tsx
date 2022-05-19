import { ReactElement } from 'react';


import { Button } from '@davidscicluna/component-library';

import Icon from '../../../../../../../../components/Icon';

import { SearchTypeProps } from './types';

const SearchType = (props: SearchTypeProps): ReactElement => {
	const { value, label, color, isActive = false, renderLeft, onClick } = props;

	return (
		<Button
			color={isActive ? color : 'gray'}
			renderLeft={({ fontSize }) =>
				renderLeft({
					isActive,
					fontSize
				})
			}
			renderRight={
				isActive ? ({ fontSize }) => <Icon icon='check' type='outlined' fontSize={fontSize} /> : undefined
			}
			onClick={() => onClick(value)}
			variant='outlined'
		>
			{label}
		</Button>
	);
};

export default SearchType;
