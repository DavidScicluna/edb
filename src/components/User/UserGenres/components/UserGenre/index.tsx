import { FC } from 'react';

import { Button, Icon } from '@davidscicluna/component-library';

import DummyUserGenre from '../DummyUserGenre';
import { color as defaultColor, colorMode as defaultColorMode } from '../../../../../common/data/defaultPropValues';

import { UserGenreProps } from './types';

const UserGenre: FC<UserGenreProps> = (props) => {
	const { color = defaultColor, colorMode = defaultColorMode, id, name, isActive = false, onClick } = props;

	return id && name ? (
		<Button
			color={isActive ? color : 'gray'}
			colorMode={colorMode}
			renderRight={
				isActive
					? ({ colorMode, height }) => (
							<Icon
								colorMode={colorMode}
								width={`${height}px`}
								height={`${height}px`}
								fontSize={`${height}px`}
								icon='check'
								category='outlined'
							/>
					  )
					: undefined
			}
			onClick={() => onClick()}
			variant='outlined'
		>
			{name}
		</Button>
	) : (
		<DummyUserGenre colorMode={colorMode} />
	);
};

export default UserGenre;
