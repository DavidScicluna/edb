/// <reference types="vite/client" />

declare module '*.svg' {
	import React = require('react');
	export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
	const src: string;
	export default src;
}

declare global {
	interface Document {
		mozCancelFullScreen?: () => Promise<void>;
		msExitFullscreen?: () => Promise<void>;
		webkitExitFullscreen?: () => Promise<void>;
		mozFullScreenElement?: Element;
		msFullscreenElement?: Element;
		webkitFullscreenElement?: Element;
	}

	interface HTMLElement {
		msRequestFullscreen?: () => Promise<void>;
		mozRequestFullscreen?: () => Promise<void>;
		webkitRequestFullscreen?: () => Promise<void>;
	}
}

// export interface HTMLFullscreenElement extends HTMLElement {
//   // Full screen entry
//   webkitRequestFullscreen(options?: FullscreenOptions): Promise<void>;
//   webkitRequestFullScreen(options?: FullscreenOptions): Promise<void>;
//   msRequestFullscreen(options?: FullscreenOptions): Promise<void>;
//   mozRequestFullScreen(options?: FullscreenOptions): Promise<void>;

//   // Monitor full screen
//   onwebkitfullscreenchange: ((this: Element, ev: Event) => any) | null;
//   onmozfullscreenchange: ((this: Element, ev: Event) => any) | null;
//   MSFullscreenChange: ((this: Element, ev: Event) => any) | null;
// }

// export interface FullscreenDocument extends Document {
//   // Elements of the current full screen
//   readonly webkitFullscreenElement: Element | null;
//   readonly msFullscreenElement: Element | null;
//   readonly mozFullScreenElement: Element | null;

//   // Exit full screen
//   webkitExitFullscreen(): Promise<void>;
//   msExitFullscreen(): Promise<void>;
//   mozCancelFullScreen(): Promise<void>;
// }
