import { ReactElement } from 'react';

import { IconProps } from './types';

const facebook = ({ style }: IconProps): ReactElement<SVGElement> => {
	return (
		<svg
			aria-hidden='true'
			role='img'
			width='24px'
			height='24px'
			version='1.1'
			viewBox='0 0 512 512'
			xmlns='http://www.w3.org/2000/svg'
			xmlSpace='preserve'
			xmlnsXlink='http://www.w3.org/1999/xlink'
			style={style}
		>
			<path
				d='M374.244,285.825l14.105,-91.961l-88.233,0l0,-59.677c0,-25.159 12.325,-49.682 51.845,-49.682l40.116,0l0,-78.291c0,0 -36.407,-6.214 -71.213,-6.214c-72.67,0 -120.165,44.042 -120.165,123.775l0,70.089l-80.777,0l0,91.961l80.777,0l0,222.31c16.197,2.541 32.798,3.865 49.709,3.865c16.911,0 33.511,-1.324 49.708,-3.865l0,-222.31l74.128,0Z'
				fill='currentColor'
			/>
		</svg>
	);
};

export default facebook;
