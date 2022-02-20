const transitionProperty = {
	common: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
	colors: 'background-color, border-color, color, fill, stroke',
	dimensions: 'width, height',
	position: 'left, right, top, bottom',
	background: 'background-color, background-image, background-position'
};

const transitionTimingFunction = {
	'ease-in': 'cubic-bezier(0.5, 0, 0.75, 0)',
	'ease-out': 'cubic-bezier(0.25, 1, 0.5, 1)',
	'ease-in-out': 'cubic-bezier(0.76, 0, 0.24, 1)'
};

const transitionDuration = {
	'ultra-fast': '50ms',
	'faster': '100ms',
	'fast': '200ms',
	'normal': '250ms',
	'slow': '500ms',
	'slower': '750ms',
	'ultra-slow': '1000ms'
};

const transition = {
	property: transitionProperty,
	easing: transitionTimingFunction,
	duration: transitionDuration
};

export default transition;
