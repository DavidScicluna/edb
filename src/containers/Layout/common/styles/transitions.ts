import { Theme } from '@davidscicluna/component-library';

type TransitionsStyle = {
	transition: string;
};

export default (theme: Theme): TransitionsStyle => ({
	transition: `${theme.transition.duration['ultra-slow']} ${theme.transition.easing['ease-in-out']}`
});
