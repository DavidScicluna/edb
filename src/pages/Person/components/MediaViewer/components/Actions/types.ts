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
export type HTMLFullscreenElement = any & HTMLElement;

// export interface FullscreenDocument extends HTMLDocument {
//   // // Elements of the current full screen
//   readonly webkitFullscreenElement: Element | null;
//   readonly msFullscreenElement: Element | null;
//   readonly mozFullScreenElement: Element | null;

//   // Exit full screen
//   webkitExitFullscreen(): Promise<void>;
//   msExitFullscreen(): Promise<void>;
//   mozCancelFullScreen(): Promise<void>;
// }

export type FullscreenDocument = any & HTMLDocument;

export type ActionsProps = {
  onClose: () => void;
  onGalleryClick: () => void;
};
