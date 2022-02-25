import { ReactElement } from 'react';

import { IconProps } from './types';

const youtube = ({ style }: IconProps): ReactElement<SVGElement> => {
	return (
		<svg
			aria-hidden='true'
			role='img'
			width='24px'
			height='24px'
			version='1.1'
			viewBox='0 0 512 512'
			xmlSpace='preserve'
			xmlns='http://www.w3.org/2000/svg'
			xmlnsXlink='http://www.w3.org/1999/xlink'
			style={style}
		>
			<path
				d='M501.303,132.765c-5.887,-22.03 -23.235,-39.377 -45.265,-45.265c-39.932,-10.7 -200.038,-10.7 -200.038,-10.7c0,0 -160.107,0 -200.039,10.7c-22.026,5.888 -39.377,23.235 -45.264,45.265c-10.697,39.928 -10.697,123.238 -10.697,123.238c0,0 0,83.308 10.697,123.232c5.887,22.03 23.238,39.382 45.264,45.269c39.932,10.696 200.039,10.696 200.039,10.696c0,0 160.106,0 200.038,-10.696c22.03,-5.887 39.378,-23.239 45.265,-45.269c10.696,-39.924 10.696,-123.232 10.696,-123.232c0,0 0,-83.31 -10.696,-123.238Zm-296.506,200.039l0,-153.603l133.019,76.802l-133.019,76.801Z'
				fill='currentColor'
			/>
		</svg>
	);
};

export default youtube;
